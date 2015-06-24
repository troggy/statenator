var fs = require('fs'),
	config = require('../config.json');

module.exports.capitalize = function(string) {
	return string.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

module.exports.lowerCaseIfPreposition = function(string) {
	return ["of"].indexOf(string.toLowerCase()) >= 0 ? string.toLowerCase() : string;
};

module.exports.rnd = function(arr) {
	var index = Math.floor(Math.random() * arr.length);
	return arr[index];
};

module.exports.cleanTmpDir = function() {
	var files = fs.readdirSync(config.tmpDir);
	files.forEach(function(file) {
		if (file == '.' || file == '..') return;
		fs.unlinkSync(config.tmpDir + file);
	});
};

module.exports.touchTmpDir = function() {
	if (!fs.existsSync(config.tmpDir)){
		fs.mkdirSync(config.tmpDir);
	}
};
