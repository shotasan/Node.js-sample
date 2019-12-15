const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
// テキストをパース処理するためのQueryStringモジュールをロード
const qs = require("querystring");

const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");

function getFromClient(request, response) {
  var url_parts = url.parse(request.url, true);

  switch (url_parts.pathname) {
    case "/":
      response_index(request, response);
      break;
    case "/other":
      response_other(request, response);
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

function response_index(request, response) {
  var msg = "これはIndexページです。"
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}

function response_other(request, response) {
  var msg = "これはOtherページです。"

  // POST送信時の処理を記載
  if (request.method == "POST") {
    // 空の文字列を定義
    var body = '';

    // dataイベント:クライアントからデータを受け取ると発生するイベント
    // 受け取ったdataをbodyに追加
    request.on('data', (data) => {
      body += data;
    });

    // endイベント:データの受け取りが完了すると発生するイベント
    request.on('end', () => {
      // 受け取ったデータをパースしてテキストの値として取り出す
      var post_data = qs.parse(body);
      msg += `あなたは「${post_data.msg}」と書きました。`;
      var content = ejs.render(other_page, {
        title: "Other",
        content: msg
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
    });
  } else {
    var msg = "ページがありません。"
    var content = ejs.render(other_page, {
      title: "Other",
      content: msg
    });
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(content);
    response.end();
  }
}