var utils = require('./utils'),
	map = require('./map'),
	config = require('../config.json');

var Country = function(epithet, type, prefix, territory, regionFile) {
	var name;

	if (territory.adj == "" || Math.random() >= 0.5) {
		name = [epithet, prefix.name, type, "of", territory.noun]
	} else {
		name = [epithet, prefix.name, territory.adj, type]
	}

	return {

		name: name.map(utils.capitalize).map(utils.lowerCaseIfPreposition).join(" "),

		worldmap : function() {
			return map.plotRegion(config.mapFile, regionFile, territory.pos);
		}

	};
};

module.exports = Country;
