var http = require('http'),
    statenator = require('./src/statenator');

var port = process.env.PORT || 3000;
var host = process.env.HOST || "127.0.0.1";

http.createServer(function (req, res) {
  if (req.url != "/") {
	  res.writeHead(404);
	  res.end();
	  return;
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1>" + statenator.randomCountry().name + "</h1>");
  res.end();
}).listen(port);

console.log('Server running at http://' + host + ':' + port + '/');
