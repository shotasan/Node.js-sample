const http = require("http");
const fs = require("fs");
// グローバル変数を定義
var request;
var response;

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

// createServerの処理を切り出し
function getFromClient(req, res) {
  request = req;
  response = res;
  fs.readFile("./index.html", "UTF-8", writeToResponse);
}

// readFileのコールバック関数
function writeToResponse(error, data) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(data);
  response.end();
}

