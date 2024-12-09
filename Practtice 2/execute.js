const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => {
  console.log("Timer !");
}, 0);

setImmediate(() => {
  console.log("Immediate 1");
});
console.log(__dirname);
fs.readFile("./text.txt", (err, data) => {
  console.log(data.toString()); // Convert Buffer to string for readable output
  setTimeout(() => {
    console.log("Timer 2");
  }, 0);

  setImmediate(() => {
    console.log("Immediate 2");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 1");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 2");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 3");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted 4");
  });
});
