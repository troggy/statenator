var utils = require('./utils');

var Country = function(epithet, type, prefix, territory) {
	var name;

	if (territory.adj == "" || Math.random() >= 0.5) {
		name = [epithet, prefix.name, type, "of", territory.noun]
	} else {
		name = [epithet, prefix.name, territory.adj, type]
	}

	return {
		name: name.map(utils.capitalize).map(utils.lowerCaseIfPreposition).join(" ")
	};
};

module.exports = Country;
