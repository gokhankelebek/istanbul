const fs = require("fs");
const path = require("path");

// Read the current menu.json
const menuPath = path.join(__dirname, "src/data/menu.json");
const menu = JSON.parse(fs.readFileSync(menuPath, "utf8"));

// Function to convert category name to directory format
function categoryToDir(category) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// Function to convert item name to filename format
function nameToFilename(name) {
  return name
    .toLowerCase()
    .replace(/[&()]/g, "") // Remove special characters
    .replace(/ö/g, "o") // Replace Turkish characters
    .replace(/ü/g, "u")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

// Update each menu item's image path
const updatedMenu = menu.map((item) => {
  if (item.categories && item.categories.length > 0) {
    const category = item.categories[0]; // Use first category
    const categoryDir = categoryToDir(category);
    const filename = nameToFilename(item.name);

    // Construct the correct image path
    const newImagePath = `/menu/${categoryDir}/${filename}.png`;

    console.log(`Updating ${item.name}:`);
    console.log(`  Old: ${item.image}`);
    console.log(`  New: ${newImagePath}`);
    console.log("");

    return {
      ...item,
      image: newImagePath,
    };
  }
  return item;
});

// Write the updated menu.json
fs.writeFileSync(menuPath, JSON.stringify(updatedMenu, null, 2));
console.log("✅ Menu images updated successfully!");
