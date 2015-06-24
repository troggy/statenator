var gm = require('gm'),
	fs = require('fs'),
	Q = require('q'),
	path = require('path'),
	concat = require('concat-stream'),
	utils = require('./utils'),
	config = require('../config.json');

var workDir = '';

var handleError = function(err) {
	if (err) {
		console.log(err);
	}
	return err;
};

var streamOutput = function(err, stdout, callback) {
	if (handleError(err)) return;
	callback(stdout);
};

var resizeRegion = function(source, width, height, callback) {
	gm(source)
		.resize(width, height, "!")
		.stream('png', function (err, stdout, stderr) {
			streamOutput(err, stdout, callback);
		});
};

var compositeAtPos = function(source, overlayPath, x, y, mask, callback) {
	gm(source)
		.composite(overlayPath, mask)
		.geometry('+' + x + '+' + y)
		.stream('png', function (err, stdout, stderr) {
			streamOutput(err, stdout, callback);
		});
};

var streamToFile = function(stream, callback) {
	var tmp_file = path.join(config.tmpDir, workDir, 'tmp' + (Math.random() * 100) + '.png');
	var tmpStream = fs.createWriteStream(tmp_file);
	stream
		.pipe(tmpStream)
		.on('close', function() {
			callback(tmp_file);
		});
};

var compositeStreamAtPos = function(source, overlayStream, x, y, mask, callback) {
	streamToFile(overlayStream, function(overlayFile) {
		compositeAtPos(source, overlayFile, x, y, mask, callback);
	});
};

var cropImage = function(source, x, y, width, height) {
	return gm(source)
		.crop(width, height, x, y)
		.stream('png');
};

var maskImage = function(source, mask, callback) {
	return gm(source)
		.composite(mask)
		.compose('In')
		.stream('png');
};

var cropAndMaskRegionByMap = function(x, y, width, height, mask, mapFile, callback) {
	streamToFile(
		cropImage(mapFile, x, y, width, height), function(file) {
			callback(maskImage(file, mask));
		}
	);
};

module.exports.plotRegion = function(mapFile, regionFile, pos) {
	var topLeft = pos['top-left'],
		bottomRight = pos['bottom-right'],
		x = topLeft[0],
		y = topLeft[1],
		width = bottomRight[0] - topLeft[0],
		height = bottomRight[1] - topLeft[1];

	var result = Q.defer();

	if (width == 0) {
		console.log("Rendering empty map.");
		fs.createReadStream(mapFile).pipe(concat(function(buff) {
			result.resolve(buff);
		}));
		return result.promise;
	}

	workDir = "map" + (Math.random() * 100);
	utils.touchDir(config.tmpDir);
	utils.touchDir(path.join(config.tmpDir, workDir));
	console.log("Rendering [" + width + ", " + height + "] region at [" + x + ", " + y + "]");

	resizeRegion(regionFile, width, height, function(regionStream) {
		streamToFile(regionStream, function (regionFile) {
			cropAndMaskRegionByMap(x, y, width, height, regionFile, mapFile, function (maskedRegionStream) {
				compositeStreamAtPos(mapFile, maskedRegionStream, x, y, null, function(stream) {
					stream.pipe(concat(function(buff) {
						result.resolve(buff);
						utils.removeTmpDir(workDir);
					}));
				});
			});
		});
	});
	return result.promise;
};