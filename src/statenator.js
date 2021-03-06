var data = require('../data.json'),
	config = require('../config.json'),
	fs = require('fs'),
	path = require('path'),
	utils = require('./utils'),
	Country = require('./country');

var regionFiles = fs.readdirSync(config.regionsDir).map(function(reg) { return path.join(config.regionsDir, reg); });

module.exports.randomCountry = function() {
	var type = utils.rnd(data.type);
	var prefix = utils.rnd(data.prefix);
	var territory = utils.rnd(data.territory);
	var epithet = utils.rnd(data.epithet);
	var regionFile = utils.rnd(regionFiles);

	return new Country(epithet, type, prefix, territory, regionFile);
};
