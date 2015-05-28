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
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function rnd(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var data = require('./data.json');

var Country = function(type, clazz, country) {
  var name;
  if (Math.random() >= 0.5) {
    name = capitalize(clazz) + " " + capitalize(type) + " of " + capitalize(country.noun);
  } else {
    name = capitalize(country.adj) + " " + capitalize(clazz) + " " + capitalize(type);
  }

  return {
    name: name
  };
};

var randomCountry = function() {
  var type = rnd(data.type);
  var clazz = rnd(data.class);
  var country = rnd(data.country);

  return new Country(type, clazz, country);
};


var port = process.env.PORT || 3000;
var host = process.env.HOST || "127.0.0.1";

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h1>" + randomCountry().name + "</h1>");
  res.end();
}).listen(port, host);

console.log('Server running at http://' + host + ':' + port + '/');
