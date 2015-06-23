var data = require('./data.json');
var parsed = require('./parse.json');

data['territory'] = data['territory'].map(function(t) {
	var adj = parsed[t["noun"]];
	if (adj) {
		t["adj"] = adj;
	}
	t["pos"] = { x: 0, y: 0 }
	return t;
});

console.log(JSON.stringify(data, null, '\t'));


