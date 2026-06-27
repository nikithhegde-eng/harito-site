const LAST_ORDER_KEY = "haritoLastOrder";
const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const orderResult = document.querySelector("#orderResult");
const params = new URLSearchParams(window.location.search);

function money(value) {
  return formatter.format(Number(value || 0));
}

async function fetchOrder() {
  const orderId = params.get("order");
  const email = params.get("email");
  if (!orderId || !email) return null;

  const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}?email=${encodeURIComponent(email)}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data.order;
}

function fallbackOrder() {
  try {
    return JSON.parse(localStorage.getItem(LAST_ORDER_KEY));
  } catch (error) {
    return null;
  }
}

function render(order) {
  if (!order) {
    orderResult.innerHTML = `
      <p>Your order was created, but this browser could not reload the order details. Open Your Orders and search by email.</p>
    `;
    return;
  }

  orderResult.innerHTML = `
    <div class="result-details">
      <div><span>Order ID</span><strong>${order.id}</strong></div>
      <div><span>Total</span><strong>${money(order.totals.total)}</strong></div>
      <div><span>Payment</span><strong>${order.payment.status.replaceAll("_", " ")}</strong></div>
      <div><span>Status</span><strong>${order.status.replaceAll("_", " ")}</strong></div>
    </div>
    <p>
      Harito saved your order. Payment verification, vendor confirmation, delivery booking, and returns are now tracked
      against this order ID.
    </p>
  `;
}

fetchOrder()
  .then((order) => render(order || fallbackOrder()))
  .catch(() => render(fallbackOrder()));
