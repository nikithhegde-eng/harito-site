const CART_KEY = "haritoCart";
const LAST_ORDER_KEY = "haritoLastOrder";
const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const cartItems = document.querySelector("#cartItems");
const cartSummary = document.querySelector("#cartSummary");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutMessage = document.querySelector("#checkoutMessage");
const loadingPanel = document.querySelector("#checkout-loading");

let catalog = window.HARITO_CATALOG || [];

function money(value) {
  return formatter.format(Number(value || 0));
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function productFor(id) {
  return catalog.find((product) => product.id === id);
}

function enrichedCart() {
  return readCart()
    .map((item) => ({ ...item, product: productFor(item.id) }))
    .filter((item) => item.product);
}

function addQueryProduct() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("add");
  const product = productFor(productId);
  if (!product) return;

  const cart = readCart();
  const size = product.sizes[0];
  const existing = cart.find((item) => item.id === product.id && item.size === size);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + 1, 5);
  } else {
    cart.push({ id: product.id, size, quantity: 1 });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.history.replaceState({}, "", "cart.html");
}

function totals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const mrpTotal = items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const shipping = subtotal >= 1499 || subtotal === 0 ? 0 : 99;
  return {
    subtotal,
    mrpTotal,
    discount: mrpTotal - subtotal,
    shipping,
    total: subtotal + shipping
  };
}

function renderCart() {
  const items = enrichedCart();
  const summary = totals(items);

  checkoutForm.hidden = !items.length;

  cartItems.innerHTML = items.length
    ? items
        .map(
          (item) => `
            <article class="cart-line">
              <img src="${item.product.images[0]}" alt="${item.product.name}" />
              <div>
                <span class="order-status">${item.product.vendor}</span>
                <h3>${item.product.name}</h3>
                <p>${item.product.color} &middot; Size ${item.size} &middot; ${item.product.brand}</p>
                <div class="cart-line-controls">
                  <button type="button" data-qty="${item.id}" data-size="${item.size}" data-change="-1">-</button>
                  <strong>${item.quantity}</strong>
                  <button type="button" data-qty="${item.id}" data-size="${item.size}" data-change="1">+</button>
                  <button type="button" data-remove="${item.id}" data-size="${item.size}">Remove</button>
                </div>
              </div>
              <strong>${money(item.product.price * item.quantity)}</strong>
            </article>
          `
        )
        .join("")
    : `
      <div class="empty-state">
        <strong>Your cart is empty</strong>
        <span>Add products from the Harito catalog to place an order.</span>
        <a class="primary-link" href="index.html#collections">Browse catalog</a>
      </div>
    `;

  cartSummary.innerHTML = `
    <div><span>MRP total</span><strong>${money(summary.mrpTotal)}</strong></div>
    <div><span>Discount</span><strong>${money(summary.discount)}</strong></div>
    <div><span>Subtotal</span><strong>${money(summary.subtotal)}</strong></div>
    <div><span>Delivery</span><strong>${summary.shipping ? money(summary.shipping) : "Free"}</strong></div>
    <div class="cart-total"><span>Total</span><strong>${money(summary.total)}</strong></div>
  `;
}

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");
  const cart = readCart();

  if (quantityButton) {
    const change = Number(quantityButton.dataset.change);
    const item = cart.find((entry) => entry.id === quantityButton.dataset.qty && entry.size === quantityButton.dataset.size);
    if (!item) return;
    item.quantity = Math.max(1, Math.min(5, item.quantity + change));
    writeCart(cart);
    return;
  }

  if (removeButton) {
    writeCart(cart.filter((item) => !(item.id === removeButton.dataset.remove && item.size === removeButton.dataset.size)));
  }
});

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  checkoutMessage.textContent = "";

  const items = readCart();
  if (!items.length) return;

  const formData = new FormData(checkoutForm);
  const payload = {
    buyer: {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone")
    },
    shippingAddress: {
      line1: formData.get("line1"),
      line2: formData.get("line2"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode")
    },
    paymentMethod: formData.get("paymentMethod"),
    items
  };

  loadingPanel.hidden = false;
  checkoutForm.querySelector("button[type='submit']").disabled = true;

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.details?.join(" ") || data.error || "Order could not be created.");
    }

    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(data.order));
    localStorage.removeItem(CART_KEY);
    window.setTimeout(() => {
      const email = encodeURIComponent(data.order.buyer.email);
      window.location.href = `order-placed.html?order=${encodeURIComponent(data.order.id)}&email=${email}`;
    }, 1200);
  } catch (error) {
    checkoutMessage.textContent = error.message;
    loadingPanel.hidden = true;
    checkoutForm.querySelector("button[type='submit']").disabled = false;
  }
});

addQueryProduct();
renderCart();
