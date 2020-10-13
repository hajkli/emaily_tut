//keys.js dont commit this
//keys.js figuer out what set of credentials to return

if (process.env.POR === 'production') {
	//we are in production return the prod set of keys
	module.exports = require('./prod');
} else {
	//we are in development
	module.exports = require('./dev');
}
