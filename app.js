const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
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

// グローバル変数を定義
var data = { msg: "no message..." }

function response_index(request, response) {
  if (request.method == "POST") {
    var body = "";

    request.on("data", (data) => {
      body += data;
    });

    request.on("end", () => {
      data = qs.parse(body);
      // setCookieメソッドにresponseオブジェクトを渡し、ヘッダーを付与する
      setCookie("msg", data.msg, response);
      write_index(request, response);
    });
  } else {
    write_index(request, response);
  }
}

function write_index(request, response) {
  var msg = "✳︎伝言を表示します";
  // クッキーの値を取得してページに表示する
  var cookie_data = getCookie("msg", request);
  var content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data: data,
    cookie_data: cookie_data
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}

function setCookie(key, value, response) {
  // escape()文字列を16進数エスケープシーケンスに置換
  var cookie = escape(value);
  // レスポンスにヘッダーを設定する。ここでは["msg=16進数"]が帰る
  response.setHeader("Set-Cookie", [key + "=" + cookie]);
}

function getCookie(key, request) {
  // requestオブジェクトにcookieプロパティが存在すればそれをcookie_dataに格納する
  var cookie_data = request.headers.cookie != undefined ?
    request.headers.cookie : "";
  // cookieは複数設定され、;で区切られるためsplitで各個に分割する
  var data = cookie_data.split(";");
  for (var i in data) {
    // trim()文字列の両端の空白を削除します。
    // startsWith() メソッドは文字列が引数で指定された文字列で始まるかを判定して true か false を返します。
    if (data[i].trim().startsWith(key + "=")) {
      // substring() メソッドは string オブジェクトの開始・終了インデックスの間、または文字列の最後までの部分集合を返します。
      // substring()でkey名=以後の値を取得する
      var result = data[i].trim().substring(key.length + 1);
      // unescape() 関数は 16 進数エスケープシーケンスをそれが表す文字列に置換します。
      return unescape(result);
    }
  }
  return "";
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