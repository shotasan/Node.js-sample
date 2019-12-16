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

var data = {
  "Taro": "00-0000-0000",
  "Hanako": "00-0000-0000",
  "Sachiko": "00-0000-0000",
  "Ichiro": "00-0000-0000",
};

var data2 = {
  "taro": ["taro@yamada", "00-000-000", "Tokyo"],
  "jiro": ["taro@yamada", "00-000-000", "Tokyo"],
  "sabu": ["taro@yamada", "00-000-000", "Tokyo"],
  "yobu": ["taro@yamada", "00-000-000", "Tokyo"]
}

function response_index(request, response) {
  var msg = "これはIndexページです。"
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data: data,
    filename: 'data_item'
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}

function response_other(request, response) {
  var msg = "これはOtherページです。"
  var content = ejs.render(other_page, {
    title: "Other",
    content: msg,
    data: data2,
    filename: "data_item"
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
};