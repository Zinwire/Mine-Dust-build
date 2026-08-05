//ХАХАХАХАХ Я БЕЗУМЕЦ
//Короче тут будут сырые статы турелей, которые будут экспортироваться в turrets.js
//Если какой-то идиот будет это читать, не повторяйте за мной, это называется говнокод

const STATS = {

	cannon: {
		health: 800,
		range: 27.5,
		reload: 1.25,
	},

	tesla: {
		damage: 35,
		health: 840,
		range: 25,
		reload: 0.2,
		consumePower: 380 / 60,
		maxHits: 5,
		bounceRadius: 10,
	}
};

module.exports = STATS;