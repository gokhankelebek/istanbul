const https = require("https");

const SITEMAP_URL =
  process.env.SITEMAP_URL || "https://www.istanbullv.com/sitemap.xml";

function ping(hostname, path) {
  return new Promise((resolve) => {
    const urlPath = path.replace("{sitemap}", encodeURIComponent(SITEMAP_URL));
    const options = { hostname, path: urlPath, method: "GET" };
    const req = https.request(options, (res) => {
      resolve({ host: hostname, status: res.statusCode });
    });
    req.on("error", () => resolve({ host: hostname, status: "error" }));
    req.end();
  });
}

async function main() {
  const targets = [
    { host: "www.google.com", path: "/ping?sitemap={sitemap}" },
    { host: "www.bing.com", path: "/ping?sitemap={sitemap}" },
  ];
  const results = await Promise.all(targets.map((t) => ping(t.host, t.path)));
  results.forEach((r) => console.log(`Pinged ${r.host}: ${r.status}`));
}

if (require.main === module) {
  main();
}

module.exports = { main };
