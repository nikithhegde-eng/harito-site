const products = window.HARITO_CATALOG || [];

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const productGrid = document.querySelector("#productGrid");
const catalogCount = document.querySelector("#catalogCount");
const genderTabs = document.querySelectorAll(".gender-tab");
const searchInput = document.querySelector("#searchInput");
const priceInput = document.querySelector("#priceInput");
const priceValue = document.querySelector("#priceValue");
const categoryFilter = document.querySelector("#categoryFilter");
const brandFilter = document.querySelector("#brandFilter");
const genderFilter = document.querySelector("#genderFilter");
const colorFilter = document.querySelector("#colorFilter");
const typeFilter = document.querySelector("#typeFilter");
const resetFilters = document.querySelector("#resetFilters");
const filterToggle = document.querySelector("#filterToggle");
const filterDropdown = document.querySelector("#filterDropdown");
const categoryPills = document.querySelector("#categoryPills");
const homeReturnForm = document.querySelector("#homeReturnForm");
const homeReturnMessage = document.querySelector("#homeReturnMessage");

let activeGender = "all";

function money(value) {
  return formatter.format(value);
}

function discount(product) {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

function sizePills(sizes) {
  return sizes.map((size) => `<span class="size-pill">${size}</span>`).join("");
}

function optionList(items, element) {
  const values = [...new Set(items)].sort((a, b) => a.localeCompare(b));
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    element.appendChild(option);
  });
}

function categoryButton(value, label, active = false) {
  return `
    <button class="category-pill ${active ? "active" : ""}" type="button" data-category="${value}">
      ${label}
    </button>
  `;
}

function renderCategoryPills() {
  const categories = [...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b));
  categoryPills.innerHTML = [
    categoryButton("all", "All", categoryFilter.value === "all"),
    ...categories.map((category) => categoryButton(category, category, categoryFilter.value === category))
  ].join("");
}

function affiliateUrl(product) {
  return product.affiliateUrl || product.buyUrl || "#";
}

function imageThumbs(product) {
  return product.images
    .map(
      (image, index) => `
        <button
          class="thumb-button ${index === 0 ? "active" : ""}"
          type="button"
          data-thumb
          data-product="${product.id}"
          data-image="${image}"
          aria-label="Show ${product.name} image ${index + 1}"
        >
          <img src="${image}" alt="${product.name} thumbnail ${index + 1}" loading="lazy" />
        </button>
      `
    )
    .join("");
}

function productCard(product) {
  const saving = product.mrp - product.price;
  return `
    <article class="product-card">
      <div class="product-gallery">
        <span class="discount-badge">${discount(product)}% off</span>
        <img
          class="product-main-image"
          src="${product.images[0]}"
          alt="${product.name}"
          loading="lazy"
          data-main-image="${product.id}"
        />
        <div class="product-thumbs">
          ${imageThumbs(product)}
        </div>
      </div>
      <div class="product-body">
        <div class="product-tags">
          <span class="checkout-tag">Affiliate link</span>
          <span>${product.brand}</span>
          <span>${product.gender}</span>
          <span>${product.category}</span>
        </div>
        <div class="product-title-row">
          <div>
            <h3>${product.name}</h3>
            <p class="product-meta">${product.vendor} · ${product.color}</p>
          </div>
          <div class="price-stack">
            <span class="price">${money(product.price)}</span>
            <span class="mrp"><s>${money(product.mrp)}</s></span>
          </div>
        </div>
        <div class="product-meta">
          <span><strong>You save:</strong> ${money(saving)}</span>
          <span><strong>Gender:</strong> ${product.gender}</span>
          <span><strong>Type:</strong> ${product.type}</span>
          <span><strong>Colour:</strong> ${product.color}</span>
          <span><strong>Affiliate route:</strong> ${product.network}</span>
        </div>
        <div class="size-section">
          <span class="size-label">Available sizes</span>
          <div class="size-list">${sizePills(product.sizes)}</div>
        </div>
        <p class="product-supplier">
          Harito shows curated affiliate-style links and uses free Unsplash fashion photos until approved product feeds are available.
        </p>
        <div class="product-actions">
          <a class="buy-link affiliate-cta" href="${affiliateUrl(product)}" target="_blank" rel="sponsored noopener noreferrer">
            View deal
          </a>
          <span class="cart-link affiliate-note">Partner site</span>
        </div>
      </div>
    </article>
  `;
}

function currentFilters() {
  return {
    search: searchInput.value.trim().toLowerCase(),
    maxPrice: Number(priceInput.value),
    category: categoryFilter.value,
    brand: brandFilter.value,
    gender: genderFilter.value,
    color: colorFilter.value,
    type: typeFilter.value
  };
}

function matchesSearch(product, search) {
  if (!search) return true;
  return [product.name, product.brand, product.vendor, product.category, product.type, product.color]
    .join(" ")
    .toLowerCase()
    .includes(search);
}

function filteredProducts() {
  const filters = currentFilters();
  return products
    .filter((product) => activeGender === "all" || product.gender === activeGender)
    .filter((product) => filters.gender === "all" || product.gender === filters.gender)
    .filter((product) => filters.category === "all" || product.category === filters.category)
    .filter((product) => filters.brand === "all" || product.brand === filters.brand)
    .filter((product) => filters.color === "all" || product.color === filters.color)
    .filter((product) => filters.type === "all" || product.type === filters.type)
    .filter((product) => product.price <= filters.maxPrice)
    .filter((product) => matchesSearch(product, filters.search))
    .sort((a, b) => discount(b) - discount(a));
}

function renderProducts() {
  priceValue.textContent = money(Number(priceInput.value));
  renderCategoryPills();
  const visibleProducts = filteredProducts();
  productGrid.innerHTML = visibleProducts.length
    ? visibleProducts.map(productCard).join("")
    : `
      <div class="empty-state">
        <strong>No exact match yet</strong>
        <span>Try a higher price limit or reset one filter. Harito only shows products that match every selected filter.</span>
      </div>
    `;
  catalogCount.textContent = `${visibleProducts.length} products shown · highest discount first`;
}

function setGender(value) {
  activeGender = value;
  genderTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.gender === value));
  genderFilter.value = value;
  renderProducts();
}

function resetCatalogFilters() {
  activeGender = "all";
  genderTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.gender === "all"));
  searchInput.value = "";
  priceInput.value = priceInput.max;
  categoryFilter.value = "all";
  brandFilter.value = "all";
  genderFilter.value = "all";
  colorFilter.value = "all";
  typeFilter.value = "all";
  renderProducts();
}

genderTabs.forEach((tab) => {
  tab.addEventListener("click", () => setGender(tab.dataset.gender));
});

[searchInput, priceInput, categoryFilter, brandFilter, genderFilter, colorFilter, typeFilter].forEach((element) => {
  element.addEventListener("input", () => {
    if (element === genderFilter) {
      activeGender = genderFilter.value;
      genderTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.gender === activeGender));
    }
    renderProducts();
  });
});

filterToggle.addEventListener("click", () => {
  const isOpen = filterDropdown.classList.toggle("open");
  filterToggle.setAttribute("aria-expanded", String(isOpen));
});

categoryPills.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  categoryFilter.value = button.dataset.category;
  renderProducts();
});

resetFilters.addEventListener("click", resetCatalogFilters);

document.addEventListener("click", (event) => {
  if (event.target.closest(".filter-menu")) return;
  filterDropdown.classList.remove("open");
  filterToggle.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  filterDropdown.classList.remove("open");
  filterToggle.setAttribute("aria-expanded", "false");
});

productGrid.addEventListener("click", (event) => {
  const thumbButton = event.target.closest("[data-thumb]");
  if (!thumbButton) return;

  const productId = thumbButton.dataset.product;
  const newImage = thumbButton.dataset.image;
  const mainImage = productGrid.querySelector(`[data-main-image="${productId}"]`);
  if (!mainImage) return;

  mainImage.src = newImage;

  const siblings = thumbButton.parentElement?.querySelectorAll(".thumb-button") || [];
  siblings.forEach((button) => button.classList.remove("active"));
  thumbButton.classList.add("active");
});

if (homeReturnForm) {
  homeReturnForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    homeReturnMessage.textContent = "Sending return request...";
    const formData = new FormData(homeReturnForm);

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
      homeReturnMessage.textContent = "Return request sent.";
      homeReturnForm.reset();
    } catch (error) {
      homeReturnMessage.textContent = error.message;
    }
  });
}

optionList(products.map((product) => product.category), categoryFilter);
optionList(products.map((product) => product.brand), brandFilter);
optionList(products.map((product) => product.color), colorFilter);
optionList(products.map((product) => product.type), typeFilter);
renderProducts();
