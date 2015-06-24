var fs = require('fs'),
	path = require('path'),
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

module.exports.removeTmpDir = function(dir) {
	var tmpDir = path.join(config.tmpDir, dir),
		files = fs.readdirSync(tmpDir);
	files.forEach(function(file) {
		if (file == '.' || file == '..') return;
		fs.unlinkSync(path.join(tmpDir, file));
	});
	fs.rmdir(tmpDir);
};

module.exports.touchDir = function(dirName) {
	if (!fs.existsSync(dirName)){
		fs.mkdirSync(dirName);
	}
};
