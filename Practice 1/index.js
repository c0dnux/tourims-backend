const http = require("http");
const url = require("url");
const fs = require("fs");
const slugify = require("slugify");

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%id%}/g, product.id);
  output = output.replace(/{%productName%}/g, product.productName);
  output = output.replace(/{%image%}/g, product.image);

  output = output.replace(/{%from%}/g, product.from);
  output = output.replace(/{%nutrients%}/g, product.nutrients);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%description%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const product = fs.readFileSync("./product.html", "utf-8");
const overview = fs.readFileSync("./overview.html", "utf-8");
const card = fs.readFileSync("./template-card.html", "utf-8");

const data = fs.readFileSync("./data.json", "utf-8");
const dataObject = JSON.parse(data);
const slugs = dataObject.map((elem) =>
  slugify(elem.productName, { lower: true })
);
console.log(slugs);

const server = http
  .createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname == "/" || pathname == "/overview") {
      const cardHtml = dataObject
        .map((elem) => replaceTemplate(card, elem))
        .join("");
      const overviewHtml = overview.replace(/{%productCard%}/g, cardHtml);
      res.writeHead(200, { "content-type": "text/html" });
      res.end(overviewHtml);
    } else if (pathname == "/product") {
      res.writeHead(200, { "content-type": "text/html" });
      const direc = query.id;

      const productHtml = replaceTemplate(product, dataObject[direc]);
      res.end(productHtml);
    } else if (pathname == "/api") {
      res.end(data);
    } else {
      res.end("<h1>Page Not Available</h1>");
    }
  })
  .listen(3000, () => {
    console.log("Listening");
  });
