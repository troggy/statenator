var http = require('http'),
    gm = require('gm');

/*
gm('images/small-star.png').size(function(err, value) {
  gm('images/gold-pattern.jpg')
    .crop(value.width, value.height, 0, 0)
    .write('images/gold-chop.png', function(err) {
      gm('images/passport-cover.gif')
      .composite('images/gold-chop.png', 'images/small-star.png')
      .geometry('+140+170')
      .write('images/output.png', function(err) {
       });
    });
});*/

function capitalize(string) {
  return string.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function lowerCaseIfPreposition(string) {
  return ["of"].indexOf(string.toLowerCase()) >= 0 ? string.toLowerCase() : string;
};

function rnd(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var data = require('./data.json');

var Country = function(epithet, type, prefix, territory) {
  var name;

  if (territory.adj == "" || Math.random() >= 0.5) {
    name = [epithet, prefix.name, type, "of", territory.noun]
  } else {
    name = [epithet, prefix.name, territory.adj, type]
  }

  return {
    name: name.map(capitalize).map(lowerCaseIfPreposition).join(" ")
  };
};

var randomCountry = function() {
  var type = rnd(data.type);
  var prefix = rnd(data.prefix);
  var territory = rnd(data.territory);
  var epithet = rnd(data.epithet);

  return new Country(epithet, type, prefix, territory);
};


var port = process.env.PORT || 3000;
var host = process.env.HOST || "127.0.0.1";

http.createServer(function (req, res) {
  if (req.url != "/") {
	  res.writeHead(404);
	  res.end();
	  return;
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1>" + randomCountry().name + "</h1>");
  res.end();
}).listen(port);

console.log('Server running at http://' + host + ':' + port + '/');
