const advisorProducts = [
  { name: "Cotton Twill Overshirt", gender: "men", type: "Shirt", color: "Olive", url: "https://www2.hm.com/en_in/men/shop-by-product/shirts.html" },
  { name: "Relaxed Linen Blend Shirt", gender: "men", type: "Shirt", color: "White", url: "https://www.zara.com/in/en/man-shirts-l737.html" },
  { name: "Baggy Fit Jeans", gender: "women", type: "Baggy jeans", color: "Light blue", url: "https://www.flipkart.com/search?q=women%20baggy%20jeans" },
  { name: "Oversized Cotton T Shirt", gender: "men", type: "Baggy t shirt", color: "White", url: "https://www.myntra.com/men-tshirts" },
  { name: "Classic 574 Sneakers", gender: "women", type: "Sneaker", color: "Grey", url: "https://www.newbalance.com/women/shoes/" },
  { name: "Everyday Sports Shoes", gender: "women", type: "Sports shoes", color: "White", url: "https://www.tatacliq.com/womens-footwear/c-msh1117100" },
  { name: "Tailored Stretch Blazer", gender: "women", type: "Blazer", color: "Black", url: "https://www.marksandspencer.in/women/" },
  { name: "Oversized Graphic T Shirt", gender: "men", type: "Baggy t shirt", color: "Black", url: "https://www.bonkerscorner.com/" },
  { name: "Breathable Training T Shirt", gender: "men", type: "T shirt", color: "Blue", url: "https://www.decathlon.in/" },
  { name: "Running Sports Shoes", gender: "men", type: "Sports shoes", color: "Black", url: "https://in.puma.com/" },
  { name: "Compact Crossbody Bag", gender: "women", type: "Accessory", color: "Tan", url: "https://www.shoppersstop.com/" },
  { name: "Relaxed Cotton Hoodie", gender: "women", type: "Top", color: "Grey", url: "https://www.bewakoof.com/" }
];

const form = document.querySelector("#advisorPageForm");
const result = document.querySelector("#advisorPageResult");

const neutralColors = ["white", "black", "grey", "navy", "indigo", "olive"];

function titleCase(value) {
  return value ? value[0].toUpperCase() + value.slice(1).toLowerCase() : "Neutral";
}

function colourAdvice(topColor, pantsColor, shoeColor) {
  const colors = [topColor, pantsColor, shoeColor].map((color) => color.trim().toLowerCase()).filter(Boolean);
  const hasNeutral = colors.some((color) => neutralColors.includes(color));

  if (!colors.length) {
    return "Start with a neutral base, then add one stronger accent through the top, shoes, or accessory.";
  }

  if (hasNeutral) {
    return "You have a clean neutral base. Keep one statement colour and let the shoes or accessory finish the outfit.";
  }

  return "Use one of your colours as the hero shade and keep the remaining pieces muted so the outfit feels intentional.";
}

function productMatches(gender, types) {
  return advisorProducts
    .filter((product) => product.gender === gender || product.gender === "all")
    .filter((product) => types.includes(product.type))
    .slice(0, 4);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const gender = document.querySelector("#advisorGender").value;
  const pants = document.querySelector("#advisorPants").value;
  const pantsColor = document.querySelector("#advisorPantsColor").value;
  const top = document.querySelector("#advisorTop").value;
  const topColor = document.querySelector("#advisorTopColor").value;
  const shoes = document.querySelector("#advisorShoes").value;
  const shoeColor = document.querySelector("#advisorShoeColor").value;
  const accessory = document.querySelector("#advisorAccessory").value;
  const matches = productMatches(gender, [pants, top, shoes, "Accessory"]);

  result.innerHTML = `
    <h3>Your style plan</h3>
    <p>
      Pair a ${titleCase(topColor)} ${top.toLowerCase()} with ${titleCase(pantsColor)}
      ${pants.toLowerCase()} and ${titleCase(shoeColor)} ${shoes.toLowerCase()}.
      Add a ${accessory.toLowerCase()} to make the look feel complete.
    </p>
    <p>${colourAdvice(topColor, pantsColor, shoeColor)}</p>
    <div class="advisor-products">
      ${matches
        .map((product) => `<a href="${product.url}" target="_blank" rel="noopener noreferrer">${product.name} · ${product.color}</a>`)
        .join("") || "<span>No catalog match yet. Add more products for this outfit type.</span>"}
    </div>
  `;
});
