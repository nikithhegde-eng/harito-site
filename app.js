const products = [
  {
    id: "hm-cotton-overshirt",
    name: "Cotton Twill Overshirt",
    gender: "men",
    category: "Workwear",
    type: "Shirt",
    brand: "H&M",
    vendor: "H&M India",
    color: "Olive",
    price: 1599,
    mrp: 2299,
    network: "Approved partner link needed",
    sizes: ["M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www2.hm.com/en_in/men/shop-by-product/shirts.html"
  },
  {
    id: "zara-relaxed-linen-shirt",
    name: "Relaxed Linen Blend Shirt",
    gender: "men",
    category: "Casual",
    type: "Shirt",
    brand: "Zara",
    vendor: "Zara India",
    color: "White",
    price: 1990,
    mrp: 2990,
    network: "Approved partner link needed",
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2f?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.zara.com/in/en/man-shirts-l737.html"
  },
  {
    id: "tatacliq-westside-dress",
    name: "Printed Midi Dress",
    gender: "women",
    category: "Dresses",
    type: "Dress",
    brand: "Westside",
    vendor: "Tata CLiQ",
    color: "Blue",
    price: 1499,
    mrp: 2499,
    network: "Tata CLiQ affiliate approval needed",
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.tatacliq.com/womens-clothing/c-msh1116100"
  },
  {
    id: "amazon-puma-sneaker",
    name: "Retro Street Sneakers",
    gender: "men",
    category: "Footwear",
    type: "Sneaker",
    brand: "Puma",
    vendor: "Amazon India",
    color: "White",
    price: 2999,
    mrp: 4599,
    network: "Amazon Associates approval needed",
    sizes: ["6", "7", "8", "9", "10"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.amazon.in/s?k=puma+men+sneakers"
  },
  {
    id: "flipkart-baggy-jeans",
    name: "Baggy Fit Jeans",
    gender: "women",
    category: "Denim",
    type: "Baggy jeans",
    brand: "Tokyo Talkies",
    vendor: "Flipkart",
    color: "Light blue",
    price: 1199,
    mrp: 2499,
    network: "Flipkart affiliate approval needed",
    sizes: ["26", "28", "30", "32"],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.flipkart.com/search?q=women%20baggy%20jeans"
  },
  {
    id: "myntra-oversized-tee",
    name: "Oversized Cotton T Shirt",
    gender: "men",
    category: "Casual",
    type: "Baggy t shirt",
    brand: "HIGHLANDER",
    vendor: "Myntra",
    color: "White",
    price: 699,
    mrp: 1499,
    network: "Myntra partner approval needed",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.myntra.com/men-tshirts"
  },
  {
    id: "impact-new-balance-574",
    name: "Classic 574 Sneakers",
    gender: "women",
    category: "Footwear",
    type: "Sneaker",
    brand: "New Balance",
    vendor: "New Balance",
    color: "Grey",
    price: 6999,
    mrp: 9999,
    network: "Impact",
    sizes: ["5", "6", "7", "8"],
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.newbalance.com/women/shoes/"
  },
  {
    id: "rakuten-levis-straight-jeans",
    name: "Straight Fit Jeans",
    gender: "men",
    category: "Denim",
    type: "Jeans",
    brand: "Levi's",
    vendor: "Levi's India",
    color: "Indigo",
    price: 1999,
    mrp: 2799,
    network: "Rakuten Advertising",
    sizes: ["28", "30", "32", "34"],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://levi.in/collections/men-jeans"
  },
  {
    id: "awin-floral-top",
    name: "Floral Casual Top",
    gender: "women",
    category: "Casual",
    type: "Top",
    brand: "Mango",
    vendor: "Mango",
    color: "Pink",
    price: 1890,
    mrp: 2590,
    network: "Awin",
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://shop.mango.com/in/women"
  },
  {
    id: "admitad-sports-shorts",
    name: "Training Flex Shorts",
    gender: "men",
    category: "Sportswear",
    type: "Shorts",
    brand: "Under Armour",
    vendor: "Under Armour",
    color: "Navy",
    price: 1499,
    mrp: 2599,
    network: "Admitad",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.underarmour.com/en-us/c/mens/bottoms/shorts/"
  },
  {
    id: "cj-tailored-blazer",
    name: "Tailored Stretch Blazer",
    gender: "women",
    category: "Workwear",
    type: "Blazer",
    brand: "Marks & Spencer",
    vendor: "Marks & Spencer",
    color: "Black",
    price: 4899,
    mrp: 6499,
    network: "CJ Affiliate",
    sizes: ["36", "38", "40", "42"],
    images: [
      "https://images.unsplash.com/photo-1593032465171-8bd1f7f6a6f8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1472417583565-62e7bdeda490?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.marksandspencer.in/women/"
  },
  {
    id: "tatacliq-sports-shoes",
    name: "Everyday Sports Shoes",
    gender: "women",
    category: "Footwear",
    type: "Sports shoes",
    brand: "Adidas",
    vendor: "Tata CLiQ",
    color: "White",
    price: 3499,
    mrp: 5999,
    network: "Tata CLiQ affiliate approval needed",
    sizes: ["5", "6", "7", "8"],
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.tatacliq.com/womens-footwear/c-msh1117100"
  },
  {
    id: "bonkers-graphic-tee",
    name: "Oversized Graphic T Shirt",
    gender: "men",
    category: "Streetwear",
    type: "Baggy t shirt",
    brand: "Bonkers Corner",
    vendor: "Bonkers Corner",
    color: "Black",
    price: 799,
    mrp: 1599,
    network: "Direct vendor approval needed",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.bonkerscorner.com/"
  },
  {
    id: "westside-linen-trousers",
    name: "Relaxed Linen Trousers",
    gender: "women",
    category: "Workwear",
    type: "Loose fit jeans",
    brand: "Westside",
    vendor: "Westside",
    color: "Beige",
    price: 1299,
    mrp: 2299,
    network: "Direct vendor outreach active",
    sizes: ["26", "28", "30", "32"],
    images: [
      "https://images.unsplash.com/photo-1506629905607-d9ec1f42267c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.westside.com/"
  },
  {
    id: "decathlon-training-tee",
    name: "Breathable Training T Shirt",
    gender: "men",
    category: "Sportswear",
    type: "T shirt",
    brand: "Decathlon",
    vendor: "Decathlon India",
    color: "Blue",
    price: 499,
    mrp: 999,
    network: "B2B outreach sent",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.decathlon.in/"
  },
  {
    id: "puma-runner-shoes",
    name: "Running Sports Shoes",
    gender: "men",
    category: "Footwear",
    type: "Sports shoes",
    brand: "Puma",
    vendor: "Puma India",
    color: "Black",
    price: 2499,
    mrp: 4999,
    network: "Support case open",
    sizes: ["6", "7", "8", "9", "10"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://in.puma.com/"
  },
  {
    id: "shoppers-stop-crossbody",
    name: "Compact Crossbody Bag",
    gender: "women",
    category: "Accessories",
    type: "Accessory",
    brand: "Shoppers Stop",
    vendor: "Shoppers Stop",
    color: "Tan",
    price: 999,
    mrp: 1999,
    network: "Vendor route requested",
    sizes: ["One size"],
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.shoppersstop.com/"
  },
  {
    id: "bewakoof-hoodie",
    name: "Relaxed Cotton Hoodie",
    gender: "women",
    category: "Streetwear",
    type: "Top",
    brand: "Bewakoof",
    vendor: "Bewakoof",
    color: "Grey",
    price: 1099,
    mrp: 2299,
    network: "Vendor route requested",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80"
    ],
    buyUrl: "https://www.bewakoof.com/"
  }
];

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
          <span class="checkout-tag">Official checkout</span>
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
          <span><strong>Partnership:</strong> ${product.network}</span>
        </div>
        <div class="size-section">
          <span class="size-label">Available sizes</span>
          <div class="size-list">${sizePills(product.sizes)}</div>
        </div>
        <p class="product-supplier">
          Harito is a discovery layer. Final checkout, delivery, and returns happen through the listed vendor.
        </p>
        <a class="buy-link" href="${product.buyUrl}" target="_blank" rel="noopener sponsored nofollow">
          View product source
        </a>
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

optionList(products.map((product) => product.category), categoryFilter);
optionList(products.map((product) => product.brand), brandFilter);
optionList(products.map((product) => product.color), colorFilter);
optionList(products.map((product) => product.type), typeFilter);
renderProducts();
