const fs = require("fs").promises;
const superagent = require("superagent");
// fs.readFile("./dog.txt", "utf-8", (err, data) => {});
fs.readFile("./dog.txt", "utf-8")
  .then((result) => {
    return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
  })
  .then((res) => {
    return fs.writeFile("./dog-image.txt", res.body.message);
  })
  .then(() => {
    console.log("alldone");
  })
  .catch((err) => {
    console.error(err);
  });
