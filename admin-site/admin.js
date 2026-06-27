const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const metricTotalOrders = document.querySelector("#metricTotalOrders");
const metricGrossSales = document.querySelector("#metricGrossSales");
const metricReturnRate = document.querySelector("#metricReturnRate");
const metricTopVendor = document.querySelector("#metricTopVendor");
const notificationCount = document.querySelector("#notificationCount");
const latestNotification = document.querySelector("#latestNotification");
const adminOrderRows = document.querySelector("#adminOrderRows");
const returnGrid = document.querySelector("#returnGrid");
const automationGrid = document.querySelector("#automationGrid");
const automationMessage = document.querySelector("#automationMessage");
const runAutomations = document.querySelector("#runAutomations");

function money(value) {
  return formatter.format(Number(value || 0));
}

function statusText(value) {
  return String(value || "").replaceAll("_", " ");
}

function statusClass(value) {
  if (value === "paid" || value === "delivered") return "delivered";
  if (value === "in_transit" || value === "vendor_order_pending") return "transit";
  return "pending";
}

function orderProductNames(order) {
  return order.items.map((item) => `${item.name} (${item.size})`).join(", ");
}

function orderVendors(order) {
  return [...new Set(order.items.map((item) => item.vendor))].join(", ");
}

function renderOrders(orders) {
  adminOrderRows.innerHTML = orders.length
    ? orders
        .map(
          (order) => `
            <div class="table-row" role="row">
              <span>${order.id}</span>
              <span>${order.buyer.email}</span>
              <span>${orderProductNames(order)}</span>
              <span>${orderVendors(order)}</span>
              <span class="status ${statusClass(order.status)}">${statusText(order.status)}</span>
              <span>${money(order.totals.total)}</span>
            </div>
          `
        )
        .join("")
    : `
      <div class="table-empty">
        <strong>No orders yet</strong>
        <span>New checkout orders will appear here.</span>
      </div>
    `;
}

function renderReturns(returns) {
  returnGrid.innerHTML = returns.length
    ? returns
        .map(
          (order) => `
            <article>
              <span>${order.id}</span>
              <h3>${order.buyer.email}</h3>
              <p>${order.returnRequest.reason}</p>
            </article>
          `
        )
        .join("")
    : `
      <article>
        <span>Returns</span>
        <h3>No open return requests</h3>
        <p>Return requests submitted by buyers will appear here.</p>
      </article>
    `;
}

function renderAutomations(tasks) {
  automationGrid.innerHTML = tasks.length
    ? tasks
        .map(
          (task) => `
            <article>
              <span>${task.type}</span>
              <h3>${task.title}</h3>
              <p>${task.detail}</p>
              <strong>${task.orderId}</strong>
            </article>
          `
        )
        .join("")
    : `
      <article>
        <span>Queue</span>
        <h3>No pending automation tasks</h3>
        <p>Payment, vendor, delivery, and return follow-ups are clear.</p>
      </article>
    `;
}

function renderDashboard(data) {
  metricTotalOrders.textContent = data.summary.totalOrders;
  metricGrossSales.textContent = money(data.summary.grossSales);
  metricReturnRate.textContent = `${data.summary.returnRate}%`;
  metricTopVendor.textContent = data.summary.topVendor;

  const unread = data.notifications.filter((item) => !item.read);
  notificationCount.textContent = `${unread.length} unread`;
  latestNotification.textContent = data.notifications[0]
    ? `${data.notifications[0].title}: ${data.notifications[0].body}`
    : "Waiting for new Harito orders.";

  renderOrders(data.recentOrders);
  renderReturns(data.returnRequests);
  renderAutomations(data.automationTasks);
}

async function loadDashboard() {
  const token = localStorage.getItem("haritoAdminToken");
  const response = await fetch("/api/admin/analytics", {
    headers: token ? { "x-admin-token": token } : {}
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Admin data could not be loaded.");
  renderDashboard(data);
}

runAutomations.addEventListener("click", async () => {
  automationMessage.textContent = "Running review...";
  const token = localStorage.getItem("haritoAdminToken");
  try {
    const response = await fetch("/api/admin/automations/run", {
      method: "POST",
      headers: token ? { "x-admin-token": token } : {}
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Automation review failed.");
    automationMessage.textContent = `${data.tasks.length} task(s) found.`;
    renderAutomations(data.tasks);
    await loadDashboard();
  } catch (error) {
    automationMessage.textContent = error.message;
  }
});

loadDashboard().catch((error) => {
  automationGrid.innerHTML = `
    <article>
      <span>Backend</span>
      <h3>Admin data unavailable</h3>
      <p>${error.message}</p>
    </article>
  `;
});
