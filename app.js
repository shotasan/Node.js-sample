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
  // renderの第二引数にオブジェクトを指定し、ejfファイルに値を渡す
  var content = ejs.render(index_page, {
    title: "Index",
    content: "これはテンプレートを使ったサンプルページです。"
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}
