const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
// urlオブジェクトの作成
const url = require("url");

const index_page = fs.readFileSync("./index.ejs", "utf8");
// スタイルファイルの読み込み
const style_css = fs.readFileSync("./style.css", "utf8");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

function getFromClient(request, response) {
  var url_parts = url.parse(request.url);
  // pathnameプロパティから/以下のパスを取得する
  switch (url_parts.pathname) {
    case "/":
      var content = ejs.render(index_page, {
        title: "Index",
        content: "これはテンプレートを使ったサンプルページです。"
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
      break;
    // index.ejsのlinkからstyle.cssにアクセスした際にcssが帰るようにする
    case "/style.css":
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(style_css);
      response.end();
      break;
    default:
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("no page...");
      break;
  }
}
