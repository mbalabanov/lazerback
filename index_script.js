const fs = require('fs');
const cheerio = require('cheerio'); // npm install cheerio

const pages = [
  "example1.html",
  "example2.html",
  "example3.html"
]
const results = [];

pages.forEach(page => {
  const content = fs.readFileSync(page, "utf8");
  const $ = cheerio.load(content);

  // Remove all '\n' and '\t' characters from the text
  $("*").contents().filter((index, node) => node.type === "text").each((index, node) => {
    node.data = node.data.replace(/[\n\t]/g, "");
  });

  // Remove all multiple spaces from the text
  $("*").contents().filter((index, node) => node.type === "text").each((index, node) => {
    node.data = node.data.replace(/\s{2,}/g, " ");
  });

  results.push({
    id: page,
    title: $("title").text(),
    content: $("main").text(),
    url: `/${page}`
  });
});

fs.writeFileSync("./js/site-index.js", `export const indexdata = ${JSON.stringify(results, null, 2)};`);

