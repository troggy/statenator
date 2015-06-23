var data = require('../data.json'),
	gm = require('gm'),
	utils = require('./utils'),
	Country = require('./country');

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




module.exports.randomCountry = function() {
	var type = utils.rnd(data.type);
	var prefix = utils.rnd(data.prefix);
	var territory = utils.rnd(data.territory);
	var epithet = utils.rnd(data.epithet);

	return new Country(epithet, type, prefix, territory);
};
