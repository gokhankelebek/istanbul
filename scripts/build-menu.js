const fs = require('fs').promises;
const path = require('path');
const parse = require('csv-parse/sync').parse;
const slugify = require('slugify');

const CSV_PATH  = 'data/ML9YFNKMX5XZJ_catalog-2025-04-20-0010.csv';   // adjust if needed
const JSON_OUT  = 'src/data/menu.json';
const IMG_ROOT  = '/images/menu/';

(async () => {
  const csv = await fs.readFile(CSV_PATH, 'utf8');
  const records = parse(csv, { columns: true, skip_empty_lines: true });

  const items = records.map(r => {
    const slug = r['Permalink']?.trim() || slugify(r['Item Name'], { lower: true });
    return {
      slug,
      name:  r['Item Name'],
      price: Number(r['Price']),
      token: r['Token'],
      desc:  r['Description'],
      categories: r['Categories']?.split(',').map(s => s.trim()) ?? [],
      img:   `${IMG_ROOT}${slug}.jpg`
    };
  });

  await fs.writeFile(JSON_OUT, JSON.stringify(items, null, 2));
  console.log(`✓  Wrote ${items.length} menu items to ${JSON_OUT}`);
})();
