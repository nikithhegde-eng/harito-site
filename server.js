const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const catalog = require("./catalog");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const NOTIFICATIONS_FILE = path.join(DATA_DIR, "notifications.json");
const PORT = Number(process.env.PORT || 4173);

const productIndex = new Map(catalog.map((product) => [product.id, product]));

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function ensureDataFiles() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, "[]\n");
  if (!fs.existsSync(NOTIFICATIONS_FILE)) fs.writeFileSync(NOTIFICATIONS_FILE, "[]\n");
}

function readJson(file, fallback) {
  ensureDataFiles();
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    return fallback;
  }
}

function writeJson(file, data) {
  ensureDataFiles();
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function sendJson(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(data));
}

function sendError(response, status, message, details = []) {
  sendJson(response, status, { error: message, details });
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });
    request.on("error", reject);
  });
}

function text(value) {
  return String(value || "").trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPincode(value) {
  return /^[1-9][0-9]{5}$/.test(value);
}

function money(value) {
  return Math.round(Number(value || 0));
}

function orderId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `H-${date}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function publicProduct(product) {
  return {
    id: product.id,
    name: product.name,
    gender: product.gender,
    category: product.category,
    type: product.type,
    brand: product.brand,
    vendor: product.vendor,
    color: product.color,
    price: product.price,
    mrp: product.mrp,
    network: product.network,
    sizes: product.sizes,
    images: product.images,
    checkoutStatus: "harito_order_request_enabled",
    fulfillmentModel: "vendor_terms_pending"
  };
}

function paymentConfiguration(total, orderRef) {
  const upiId = text(process.env.HARITO_UPI_ID);
  if (upiId) {
    const params = new URLSearchParams({
      pa: upiId,
      pn: "Harito",
      am: String(total),
      cu: "INR",
      tn: `Harito ${orderRef}`
    });
    return {
      provider: "manual_upi",
      status: "pending_manual_verification",
      upiIntent: `upi://pay?${params.toString()}`,
      instructions: "Buyer payment must be verified before fulfillment."
    };
  }

  return {
    provider: "not_configured",
    status: "provider_setup_required",
    upiIntent: null,
    instructions: "Connect a payment gateway or HARITO_UPI_ID before collecting live payment."
  };
}

function validateOrderPayload(payload) {
  const errors = [];
  const buyer = {
    name: text(payload.buyer?.name),
    email: text(payload.buyer?.email).toLowerCase(),
    phone: text(payload.buyer?.phone)
  };
  const shippingAddress = {
    line1: text(payload.shippingAddress?.line1),
    line2: text(payload.shippingAddress?.line2),
    city: text(payload.shippingAddress?.city),
    state: text(payload.shippingAddress?.state),
    pincode: text(payload.shippingAddress?.pincode)
  };

  if (!buyer.name) errors.push("Buyer name is required.");
  if (!isEmail(buyer.email)) errors.push("A valid buyer email is required.");
  if (!buyer.phone || buyer.phone.replace(/\D/g, "").length < 10) errors.push("A valid buyer phone is required.");
  if (!shippingAddress.line1) errors.push("Delivery address is required.");
  if (!shippingAddress.city) errors.push("City is required.");
  if (!shippingAddress.state) errors.push("State is required.");
  if (!isPincode(shippingAddress.pincode)) errors.push("A valid 6 digit pincode is required.");

  const requestedItems = Array.isArray(payload.items) ? payload.items : [];
  if (!requestedItems.length) errors.push("Cart is empty.");

  const items = requestedItems
    .map((item) => {
      const product = productIndex.get(text(item.id));
      const quantity = Math.max(1, Math.min(5, Number(item.quantity || 1)));
      const size = text(item.size);

      if (!product) {
        errors.push(`Product ${text(item.id) || "unknown"} is not available.`);
        return null;
      }

      if (!product.sizes.includes(size)) {
        errors.push(`${product.name} needs a valid size.`);
      }

      return {
        productId: product.id,
        sku: product.id,
        name: product.name,
        brand: product.brand,
        vendor: product.vendor,
        category: product.category,
        color: product.color,
        size,
        quantity,
        unitPrice: money(product.price),
        mrp: money(product.mrp),
        lineTotal: money(product.price * quantity),
        image: product.images[0],
        vendorSettlementStatus: "terms_pending",
        fulfillmentStatus: "vendor_terms_pending"
      };
    })
    .filter(Boolean);

  return { buyer, shippingAddress, items, errors };
}

function createOrder(payload) {
  const { buyer, shippingAddress, items, errors } = validateOrderPayload(payload);
  if (errors.length) {
    return { errors };
  }

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const mrpTotal = items.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const shipping = subtotal >= 1499 ? 0 : 99;
  const total = subtotal + shipping;
  const id = orderId();
  const now = new Date().toISOString();
  const payment = paymentConfiguration(total, id);

  return {
    order: {
      id,
      createdAt: now,
      updatedAt: now,
      status: "payment_pending",
      buyer,
      shippingAddress,
      items,
      totals: {
        mrpTotal,
        discount: mrpTotal - subtotal,
        subtotal,
        shipping,
        total,
        estimatedCommission: 0
      },
      payment: {
        method: text(payload.paymentMethod) || "online",
        provider: payment.provider,
        status: payment.status,
        paymentId: null,
        upiIntent: payment.upiIntent,
        instructions: payment.instructions
      },
      vendor: {
        orderStatus: "not_sent",
        settlementStatus: "terms_pending",
        notes: "Vendor catalog, commission, settlement, and delivery terms must be confirmed before fulfillment."
      },
      delivery: {
        status: "not_booked",
        partner: null,
        trackingNumber: null,
        trackingUrl: null
      },
      returnRequest: null,
      events: [
        { at: now, type: "order_created", note: "Harito order record created." },
        { at: now, type: "payment_pending", note: payment.instructions },
        { at: now, type: "vendor_terms_pending", note: "Vendor fulfillment is not sent until commercial terms are confirmed." }
      ]
    }
  };
}

function addNotification(title, body, orderIdValue, type = "order") {
  const notifications = readJson(NOTIFICATIONS_FILE, []);
  notifications.unshift({
    id: crypto.randomBytes(6).toString("hex"),
    createdAt: new Date().toISOString(),
    type,
    title,
    body,
    orderId: orderIdValue,
    read: false
  });
  writeJson(NOTIFICATIONS_FILE, notifications.slice(0, 80));
}

function getOrdersForBuyer(email) {
  const normalized = text(email).toLowerCase();
  if (!isEmail(normalized)) return [];
  return readJson(ORDERS_FILE, []).filter((order) => order.buyer?.email === normalized);
}

function isAdmin(request, url) {
  const token = text(process.env.HARITO_ADMIN_TOKEN);
  if (!token) return true;
  return request.headers["x-admin-token"] === token || url.searchParams.get("token") === token;
}

function automationTasks(orders) {
  const tasks = [];
  orders.forEach((order) => {
    if (order.payment?.status !== "paid") {
      tasks.push({
        orderId: order.id,
        type: "payment",
        title: "Payment verification needed",
        detail: `${order.buyer.email} has an order total of Rs. ${order.totals.total}.`
      });
    }
    if (order.payment?.status === "paid" && order.vendor?.orderStatus !== "sent") {
      tasks.push({
        orderId: order.id,
        type: "vendor",
        title: "Send vendor fulfillment request",
        detail: `${order.items.length} item(s) need vendor stock confirmation and order acceptance.`
      });
    }
    if (order.payment?.status === "paid" && order.delivery?.status === "not_booked") {
      tasks.push({
        orderId: order.id,
        type: "delivery",
        title: "Book delivery",
        detail: "Assign courier pickup after vendor confirms stock and packing details."
      });
    }
    if (order.returnRequest && order.returnRequest.status === "open") {
      tasks.push({
        orderId: order.id,
        type: "return",
        title: "Return request open",
        detail: order.returnRequest.reason
      });
    }
  });
  return tasks;
}

function analytics() {
  const orders = readJson(ORDERS_FILE, []);
  const notifications = readJson(NOTIFICATIONS_FILE, []);
  const grossSales = orders.reduce((sum, order) => sum + Number(order.totals?.total || 0), 0);
  const paidSales = orders
    .filter((order) => order.payment?.status === "paid")
    .reduce((sum, order) => sum + Number(order.totals?.total || 0), 0);
  const returns = orders.filter((order) => order.returnRequest);
  const vendorTotals = new Map();
  orders.forEach((order) => {
    order.items.forEach((item) => {
      vendorTotals.set(item.vendor, (vendorTotals.get(item.vendor) || 0) + item.lineTotal);
    });
  });
  const topVendor = [...vendorTotals.entries()].sort((a, b) => b[1] - a[1])[0];
  const dailySales = {};
  orders.forEach((order) => {
    const day = order.createdAt.slice(0, 10);
    dailySales[day] = (dailySales[day] || 0) + Number(order.totals?.total || 0);
  });

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      totalOrders: orders.length,
      grossSales,
      paidSales,
      pendingPayments: orders.filter((order) => order.payment?.status !== "paid").length,
      returnRate: orders.length ? Math.round((returns.length / orders.length) * 1000) / 10 : 0,
      averageOrderValue: orders.length ? Math.round(grossSales / orders.length) : 0,
      topVendor: topVendor ? topVendor[0] : "No orders yet"
    },
    vendorTotals: [...vendorTotals.entries()]
      .map(([vendor, total]) => ({ vendor, total }))
      .sort((a, b) => b.total - a.total),
    dailySales: Object.entries(dailySales).map(([date, total]) => ({ date, total })),
    recentOrders: orders.slice(-12).reverse(),
    returnRequests: returns.slice(-8).reverse(),
    notifications: notifications.slice(0, 12),
    automationTasks: automationTasks(orders)
  };
}

function updateOrder(orderIdValue, updater) {
  const orders = readJson(ORDERS_FILE, []);
  const index = orders.findIndex((order) => order.id === orderIdValue);
  if (index === -1) return null;
  const updated = updater(orders[index]);
  updated.updatedAt = new Date().toISOString();
  orders[index] = updated;
  writeJson(ORDERS_FILE, orders);
  return updated;
}

async function handleApi(request, response, url) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-token",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS"
    });
    response.end();
    return true;
  }

  if (url.pathname === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true, catalogItems: catalog.length });
    return true;
  }

  if (url.pathname === "/api/catalog" && request.method === "GET") {
    sendJson(response, 200, { products: catalog.map(publicProduct) });
    return true;
  }

  if (url.pathname === "/api/orders" && request.method === "POST") {
    const payload = await readBody(request);
    const result = createOrder(payload);
    if (result.errors) {
      sendError(response, 422, "Order could not be created.", result.errors);
      return true;
    }

    const orders = readJson(ORDERS_FILE, []);
    orders.push(result.order);
    writeJson(ORDERS_FILE, orders);
    addNotification("New order request", `${result.order.buyer.name} created ${result.order.id}.`, result.order.id);
    sendJson(response, 201, { order: result.order });
    return true;
  }

  if (url.pathname === "/api/orders" && request.method === "GET") {
    const email = url.searchParams.get("email");
    sendJson(response, 200, { orders: getOrdersForBuyer(email) });
    return true;
  }

  const orderMatch = url.pathname.match(/^\/api\/orders\/([^/]+)$/);
  if (orderMatch && request.method === "GET") {
    const id = orderMatch[1];
    const email = url.searchParams.get("email");
    const order = getOrdersForBuyer(email).find((buyerOrder) => buyerOrder.id === id);
    if (!order) {
      sendError(response, 404, "Order not found for this email.");
      return true;
    }
    sendJson(response, 200, { order });
    return true;
  }

  if (url.pathname === "/api/returns" && request.method === "POST") {
    const payload = await readBody(request);
    const id = text(payload.orderId);
    const email = text(payload.email).toLowerCase();
    const reason = text(payload.reason);
    if (!id || !isEmail(email) || !reason) {
      sendError(response, 422, "Order ID, buyer email, and return reason are required.");
      return true;
    }

    const updated = updateOrder(id, (order) => {
      if (order.buyer.email !== email) return order;
      order.returnRequest = {
        status: "open",
        reason,
        createdAt: new Date().toISOString()
      };
      order.events.push({ at: new Date().toISOString(), type: "return_requested", note: reason });
      return order;
    });

    if (!updated || updated.buyer.email !== email) {
      sendError(response, 404, "Order not found for this email.");
      return true;
    }

    addNotification("Return request", `${updated.id} has a return request.`, updated.id, "return");
    sendJson(response, 200, { order: updated });
    return true;
  }

  if (url.pathname === "/api/admin/analytics" && request.method === "GET") {
    if (!isAdmin(request, url)) {
      sendError(response, 401, "Admin token required.");
      return true;
    }
    sendJson(response, 200, analytics());
    return true;
  }

  if (url.pathname === "/api/admin/orders" && request.method === "GET") {
    if (!isAdmin(request, url)) {
      sendError(response, 401, "Admin token required.");
      return true;
    }
    sendJson(response, 200, { orders: readJson(ORDERS_FILE, []).slice().reverse() });
    return true;
  }

  const adminOrderMatch = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)\/status$/);
  if (adminOrderMatch && request.method === "PATCH") {
    if (!isAdmin(request, url)) {
      sendError(response, 401, "Admin token required.");
      return true;
    }
    const payload = await readBody(request);
    const updated = updateOrder(adminOrderMatch[1], (order) => {
      const now = new Date().toISOString();
      if (payload.paymentStatus) order.payment.status = text(payload.paymentStatus);
      if (payload.paymentId) order.payment.paymentId = text(payload.paymentId);
      if (payload.orderStatus) order.status = text(payload.orderStatus);
      if (payload.vendorOrderStatus) order.vendor.orderStatus = text(payload.vendorOrderStatus);
      if (payload.vendorSettlementStatus) order.vendor.settlementStatus = text(payload.vendorSettlementStatus);
      if (payload.deliveryStatus) order.delivery.status = text(payload.deliveryStatus);
      if (payload.deliveryPartner) order.delivery.partner = text(payload.deliveryPartner);
      if (payload.trackingNumber) order.delivery.trackingNumber = text(payload.trackingNumber);
      if (payload.trackingUrl) order.delivery.trackingUrl = text(payload.trackingUrl);
      order.events.push({ at: now, type: "admin_update", note: text(payload.note) || "Order status updated." });
      if (order.payment.status === "paid" && order.status === "payment_pending") {
        order.status = "vendor_order_pending";
      }
      return order;
    });
    if (!updated) {
      sendError(response, 404, "Order not found.");
      return true;
    }
    sendJson(response, 200, { order: updated });
    return true;
  }

  if (url.pathname === "/api/admin/automations/run" && request.method === "POST") {
    if (!isAdmin(request, url)) {
      sendError(response, 401, "Admin token required.");
      return true;
    }
    const tasks = automationTasks(readJson(ORDERS_FILE, []));
    addNotification("Automation review complete", `${tasks.length} task(s) need attention.`, null, "automation");
    sendJson(response, 200, { tasks });
    return true;
  }

  if (url.pathname === "/api/payments/webhook" && request.method === "POST") {
    const secret = text(process.env.HARITO_WEBHOOK_SECRET);
    if (secret && request.headers["x-harito-webhook-secret"] !== secret) {
      sendError(response, 401, "Webhook secret invalid.");
      return true;
    }
    const payload = await readBody(request);
    const id = text(payload.orderId);
    const status = text(payload.status);
    const updated = updateOrder(id, (order) => {
      order.payment.status = status === "paid" ? "paid" : "payment_failed";
      order.payment.paymentId = text(payload.paymentId);
      order.events.push({
        at: new Date().toISOString(),
        type: "payment_webhook",
        note: `Payment marked ${order.payment.status}.`
      });
      if (order.payment.status === "paid") order.status = "vendor_order_pending";
      return order;
    });
    if (!updated) {
      sendError(response, 404, "Order not found.");
      return true;
    }
    addNotification("Payment updated", `${updated.id} payment is ${updated.payment.status}.`, updated.id, "payment");
    sendJson(response, 200, { order: updated });
    return true;
  }

  return false;
}

function serveStatic(request, response, url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  if (pathname === "/admin") pathname = "/admin-site/index.html";

  const requestedPath = path.normalize(path.join(ROOT, pathname));
  if (!requestedPath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(requestedPath, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const ext = path.extname(requestedPath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-store" : "public, max-age=60"
    });
    fs.createReadStream(requestedPath).pipe(response);
  });
}

ensureDataFiles();

http
  .createServer(async (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    try {
      if (url.pathname.startsWith("/api/")) {
        const handled = await handleApi(request, response, url);
        if (!handled) sendError(response, 404, "API route not found.");
        return;
      }
      serveStatic(request, response, url);
    } catch (error) {
      sendError(response, 500, error.message || "Server error.");
    }
  })
  .listen(PORT, () => {
    console.log(`Harito backend running at http://localhost:${PORT}`);
  });
