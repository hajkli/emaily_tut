const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/users.js');
require('./services/passport.js');
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //30 dats 24 hours 60 minutes 60 second 1000 miliseconds
		keys: [keys.cookieKey], // crypt key for safety
	})
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
