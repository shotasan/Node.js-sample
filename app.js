const http = require("http");
const fs = require("fs");
// ejsオブジェクトの読み込み
const ejs = require("ejs");

// テンプレートファイルの読み込み
// サーバー実行前に同期処理でファイルを読みこむ
const index_page = fs.readFileSync("./index.ejs", "utf8");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

function getFromClient(request, response) {
  // レンダリングの実行（HTMLファイルへの変換）
  var content = ejs.render(index_page);
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}
