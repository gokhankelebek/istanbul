const fs = require("fs");
const path = require("path");

// Read the current menu.json
const menuPath = path.join(__dirname, "src/data/menu.json");
const menu = JSON.parse(fs.readFileSync(menuPath, "utf8"));

// Mapping of item names to correct image filenames
const imageMapping = {
  // Turkish Pita
  "Beef&Lamb Döner (Shawarma) Turkish Pita":
    "/menu/turkish-pita/beefandlamb-doner-shawarma-turkish-pita.png",
  "Chicken Döner (Shawarma) Turkish Pita":
    "/menu/turkish-pita/chicken-doner-shawarma-turkish-pita.png",
  "Mixed Döner (Beef&Lamb and Chicken Shawarma) Turkish Pita":
    "/menu/turkish-pita/mixed-doner-beefandlamb-and-chicken-shawarma-turkish-pita.png",
  "Falafel Turkish Pita": "/menu/turkish-pita/falafel-turkish-pita.png",

  // Lavash Wraps
  "Beef&Lamb Döner (Shawarma) Lavash Wrap":
    "/menu/lavash-wraps/beefandlamb-doner-shawarma-lavash-wrap.png",
  "Chicken Döner (Shawarma) Lavash Wrap":
    "/menu/lavash-wraps/chicken-doner-shawarma-lavash-wrap.png",
  "Mixed Döner (Beef&Lamb and Chicken Shawarma) Lavash Wrap":
    "/menu/lavash-wraps/mixed-doner-lavash-wrap.png",
  "Falafel Lavash Wrap": "/menu/lavash-wraps/falafel-lavash-wrap.png",
  "Chikofte Wrap": "/menu/lavash-wraps/chikofte-wrap.png",

  // Pita Sandwiches
  "Beef&Lamb Döner (Shawarma) Pita":
    "/menu/pita-sandwiches/beefandlamb-doner-shawarma-pita.png",
  "Chicken Döner (Shawarma) Pita":
    "/menu/pita-sandwiches/chicken-doner-shawarma-pita.png",
  "Mixed Döner (Beef&Lamb and Chicken Shawarma) Pita":
    "/menu/pita-sandwiches/mixed-doner-pita.png",
  "Falafel Pita": "/menu/pita-sandwiches/falafel-pita.png",
  "Chikofte Pita": "/menu/pita-sandwiches/chikofte-pita.png",

  // Rice Bowls
  "Beef&Lamb Döner (Shawarma) Rice Bowl":
    "/menu/rice-bowls/beefandlamb-doner-shawarma-rice-bowl.png",
  "Chicken Döner (Shawarma) Rice Bowl":
    "/menu/rice-bowls/chicken-doner-shawarma-rice-bowl.png",
  "Mixed Döner (Beef&Lamb and Chicken Shawarma) Rice Bowl":
    "/menu/rice-bowls/mixed-doner-rice-bowl.png",
  "Falafel Rice Bowl": "/menu/rice-bowls/falafel-rice-bowl.png",

  // French Fries Bowls
  "Beef&Lamb Döner (Shawarma) French Fries Bowl":
    "/menu/french-fries-bowls/beefandlamb-doner-shawarma-french-fries-bowl.png",
  "Chicken Döner (Shawarma) French Fries Bowl":
    "/menu/french-fries-bowls/chicken-doner-shawarma-french-fries-bowl.png",
  "Mixed Döner (Beef&Lamb and Chicken Shawarma) French Fries Bowl":
    "/menu/french-fries-bowls/mixed-doner-french-fries-bowl.png",
  "Falafel French Fries Bowl":
    "/menu/french-fries-bowls/falafel-french-fries-bowl.png",

  // Salad Bowls
  "Beef&Lamb Döner (Shawarma) Salad Bowl":
    "/menu/salad-bowls/beefandlamb-doner-shawarma-salad-bowl.png",
  "Chicken Döner (Shawarma) Salad Bowl":
    "/menu/salad-bowls/chicken-doner-shawarma-salad-bowl.png",
  "Mixed Döner (Beef&Lamb and Chicken Shawarma) Salad Bowl":
    "/menu/salad-bowls/mixed-doner-salad-bowl.png",
  "Falafel Salad Bowl": "/menu/salad-bowls/falafel-salad-bowl.png",
  "Chikofte Salad Bowl": "/menu/salad-bowls/chikofte-salad-bowl.png",
  "Veggie Bowl": "/menu/salad-bowls/veggie-bowl.png",

  // Sides
  "Side Rice": "/menu/sides/side-rice.png",
  "French Fries": "/menu/sides/french-fries.png",
  "Mozzarella Sticks (5 Pieces)": "/menu/sides/mozzarella-sticks.png",
  "Onion Rings": "/menu/sides/onion-rings.png",
  "Tzatziki Dip": "/menu/sides/tzatziki-dip.png",
  "Stuffed Grape Leaves (4 Pieces)": "/menu/sides/stuffed-grape-leaves.png",
  "Falafel Side (4 Pieces)": "/menu/sides/falafel-side.png",
  Hummus: "/menu/sides/hummus.png",
  "Extra Pita": "/menu/sides/extra-pita.png",
  "Side Beef&Lamb Döner (Shawarma)":
    "/menu/sides/side-beefandlamb-doner-shawarma.png",
  "Side Chicken Döner (Shawarma)":
    "/menu/sides/side-chicken-doner-shawarma.png",
  "Side Mixed (Beef&Lamb and Chicken) Döner (Shawarma)":
    "/menu/sides/side-mixed-beefandlamb-and-chicken-doner-shawarma.png",
  "Side Sauce": "/menu/sides/side-sauce.png",
  "Chikofte Side (4 Pieces)": "/menu/sides/chikofte-side.png",

  // Desserts
  Baklava: "/menu/desserts/baklava.png",
  "Rice Pudding": "/menu/desserts/rice-pudding.png",

  // Drinks
  Coke: "/menu/drinks/coke.png",
  "Diet Coke": "/menu/drinks/diet-coke.png",
  "Coke Zero": "/menu/drinks/coke-zero.png",
  Sprite: "/menu/drinks/sprite.png",
  "Dr Pepper": "/menu/drinks/dr-pepper.png",
  Water: "/menu/drinks/water.png",
  "Yogurt Drink (Ayran)": "/menu/drinks/yogurt-drink-ayran.png",
};

// Update each menu item's image path
const updatedMenu = menu.map((item) => {
  const correctPath = imageMapping[item.name];
  if (correctPath) {
    console.log(`✅ ${item.name}: ${correctPath}`);
    return {
      ...item,
      image: correctPath,
    };
  } else {
    console.log(`❌ No mapping found for: ${item.name}`);
    return item;
  }
});

// Write the updated menu.json
fs.writeFileSync(menuPath, JSON.stringify(updatedMenu, null, 2));
console.log("\n✅ Menu images updated successfully!");
