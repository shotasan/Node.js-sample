const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");

const index_page = fs.readFileSync("./index.ejs", "utf8");
// テンプレートの読み込み
const other_page = fs.readFileSync("./other.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

function getFromClient(request, response) {
  // parseメソッドの第二引数にtrueを指定するとクエリパラメーター部分もパース処理される
  var url_parts = url.parse(request.url, true);
  switch (url_parts.pathname) {
    case "/":
      var content = "これはIndexページです。"
      // queryプロパティからパースされたクエリパラメーターを取得する
      var query = url_parts.query;
      if (query.msg != undefined) {
        // contentの内容にクエリパラメータに渡されたmsg部分を追加する
        content += `あなたは「${query.msg}」と送りました`
      }
      var content = ejs.render(index_page, {
        title: "Index",
        content: content
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
      break;
    case "/other":
      var content = ejs.render(other_page, {
        title: "Other",
        content: "これは新しく用意したページです。"
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
      break;
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
