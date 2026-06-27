const LAST_ORDER_KEY = "haritoLastOrder";
const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const orderLookupForm = document.querySelector("#orderLookupForm");
const returnRequestForm = document.querySelector("#returnRequestForm");
const orderList = document.querySelector("#orderList");
const ordersMessage = document.querySelector("#ordersMessage");
const returnMessage = document.querySelector("#returnMessage");

function money(value) {
  return formatter.format(Number(value || 0));
}

function statusText(value) {
  return String(value || "").replaceAll("_", " ");
}

function orderItems(order) {
  return order.items
    .map(
      (item) => `
        <li>
          <span>${item.name}</span>
          <strong>${item.size} x ${item.quantity}</strong>
        </li>
      `
    )
    .join("");
}

function renderOrders(orders) {
  if (!orders.length) {
    orderList.innerHTML = `
      <div class="empty-state">
        <strong>No orders found</strong>
        <span>Use the email entered at checkout, or place a new order from the catalog.</span>
      </div>
    `;
    return;
  }

  orderList.innerHTML = orders
    .map(
      (order) => `
        <article class="order-card order-card-wide">
          <img src="${order.items[0]?.image || ""}" alt="${order.items[0]?.name || "Harito order"}" />
          <div>
            <span class="order-status">${statusText(order.status)}</span>
            <h2>${order.id}</h2>
            <p>${order.buyer.name} · ${new Date(order.createdAt).toLocaleString()}</p>
            <div class="order-status-grid">
              <div><span>Payment</span><strong>${statusText(order.payment.status)}</strong></div>
              <div><span>Vendor</span><strong>${statusText(order.vendor.orderStatus)}</strong></div>
              <div><span>Delivery</span><strong>${statusText(order.delivery.status)}</strong></div>
              <div><span>Total</span><strong>${money(order.totals.total)}</strong></div>
            </div>
            <ul class="order-item-list">${orderItems(order)}</ul>
            <a class="primary-link" href="#returns" data-return-order="${order.id}" data-return-email="${order.buyer.email}">
              Request return
            </a>
          </div>
        </article>
      `
    )
    .join("");
}

async function loadOrders(email) {
  ordersMessage.textContent = "Loading orders...";
  const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Orders could not be loaded.");
  ordersMessage.textContent = "";
  renderOrders(data.orders);
}

orderLookupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = new FormData(orderLookupForm).get("email");
  try {
    await loadOrders(email);
  } catch (error) {
    ordersMessage.textContent = error.message;
  }
});

orderList.addEventListener("click", (event) => {
  const returnLink = event.target.closest("[data-return-order]");
  if (!returnLink) return;
  returnRequestForm.elements.orderId.value = returnLink.dataset.returnOrder;
  returnRequestForm.elements.email.value = returnLink.dataset.returnEmail;
});

returnRequestForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  returnMessage.textContent = "Sending return request...";
  const formData = new FormData(returnRequestForm);

  try {
    const response = await fetch("/api/returns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: formData.get("orderId"),
        email: formData.get("email"),
        reason: formData.get("reason")
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Return request could not be sent.");
    returnMessage.textContent = "Return request sent.";
    returnRequestForm.reset();
  } catch (error) {
    returnMessage.textContent = error.message;
  }
});

try {
  const lastOrder = JSON.parse(localStorage.getItem(LAST_ORDER_KEY));
  if (lastOrder?.buyer?.email) {
    orderLookupForm.elements.email.value = lastOrder.buyer.email;
    loadOrders(lastOrder.buyer.email).catch((error) => {
      ordersMessage.textContent = error.message;
    });
  }
} catch (error) {
  renderOrders([]);
}
