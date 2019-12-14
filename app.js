const http = require("http");

// http.Serverオブジェクトの作成
var server = http.createServer(
  (request, response) => {
    // endはクライアントへの返信を終了するメソッド
    response.end('<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>');
  }
);
// http.Serverオブジェクトを待ち受け状態にする
server.listen(3000);