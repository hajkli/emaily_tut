const passport = require('passport');
//test
module.exports = (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
			prompt: 'select_account',
		})
	);

	console.log('test');

	app.get('/auth/google/callback', passport.authenticate('google'));
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	app.get('/api/logout', (req, res) => {
		res.logout();
		res.send(req.user);
	});
};
