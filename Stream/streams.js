const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
    //Solution  !
  //   fs.readFile("./text1.txt", (err, data) => {
  //     res.end(data);
  //   });


  //Solution 2
//   const readable = fs.createReadStream("./text1.txt");
//   readable.on("data", (chuk) => {
//     res.write(chuk);
//   });
//   readable.on("end", () => {
//     res.end();
//   });
//   readable.on("error", (err) => {
//     console.log(err);
//     res.statusCode = 500;
//     res.end("Error");
//   });


//Solution #
const readable = fs.createReadStream("./text1.txt");
readable.pipe(res)
});
server.listen(3000, () => {
  console.log("Listening");
});
