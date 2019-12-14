const http = require("http");
const fs = require("fs");

// http.Serverオブジェクトの作成
var server = http.createServer(
  (request, response) => {
    // readFile(ファイルパス,エンコーディング名,コールバック関数)
    fs.readFile("./index.html", "UTF-8",
      (error, data) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
      });
  }
);
server.listen(3000);
console.log("Server start!");