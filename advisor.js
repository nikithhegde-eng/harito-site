const advisorProducts = (window.HARITO_CATALOG || []).map((product) => ({
  name: product.name,
  gender: product.gender,
  type: product.type,
  color: product.color,
  url: product.affiliateUrl || product.buyUrl || "#"
}));

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
        .map(
          (product) => `
            <a href="${product.url}" target="_blank" rel="sponsored noopener noreferrer">
              ${product.name} · ${product.color}
            </a>
          `
        )
        .join("") || "<span>No catalog match yet. Add more products for this outfit type.</span>"}
    </div>
  `;
});
