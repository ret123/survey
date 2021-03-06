const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');
mongoose.connect(keys.MONGO_URI);
const app = express();

app.use(cookieSession ({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.COOKIE_KEY]
})
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log('Server listening at port 5000');
});