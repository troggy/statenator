var http = require('http'),
	utils = require('./src/utils'),
	ejs = require('ejs'),
    statenator = require('./src/statenator');

var port = process.env.PORT || 3000;
var host = process.env.HOST || "127.0.0.1";

http.createServer(function (req, res) {
  if (req.url != "/") {
	  res.writeHead(404);
	  res.end();
	  return;
  }
  var country = statenator.randomCountry();
  country.worldmap().then(function(mapBuff) {
	  var mapBase64 = mapBuff.toString('base64');
	  console.log("Country: " + country.name);
	  ejs.renderFile('index.ejs', {
		  name: country.name,
		  description : '',
		  map: "data:image/png;base64," + mapBase64
	  }, {}, function(err, str) {
		  if (err) {
			  console.log(err);
			  res.writeHead(500, {'Content-Type': 'text/html'});
			  res.write("Ops.. Something bad happened.");
			  res.end();
		  } else {
			  res.writeHead(200, {'Content-Type': 'text/html'});
			  res.write(str);
			  res.end();
		  }
	  });

  });
}).listen(port);

console.log('Server running at http://' + host + ':' + port + '/');
