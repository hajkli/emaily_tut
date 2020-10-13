const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			console.log('profile: ', profile);
			User.findOne({ googleId: profile.id }).then((existingUser) => {
				//we'll get promise
				if (existingUser) {
					// if user exist  user/null
					//we alreade have a record with given profile ID
					done(null, existingUser);
				} else {
					//we do not have this user in our DB, create record
					new User({
						googleId: profile.id,
					})
						.save()
						.then((user) => done(null, user));
				}
			});
		}
	)
);
