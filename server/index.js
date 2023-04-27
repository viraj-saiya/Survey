const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// const cookieSession = require('cookie-session');
const passport = require("passport");
const expressSession = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(expressSession);

require('./models/user');
require('./services/passport');

const app = express();

mongoose.connect(keys.MONGODB_URI).then(()=>{
  console.log("Connected");
});

var store = new MongoDBStore({
  uri: keys.MONGODB_URI,
  collection: 'userSession'
});

store.on('error', function(error) {
  console.log(error);
});

app.use(
  expressSession({
    secret:[keys.COOKIE_KEY],
    resave:false,
    saveUninitialized:false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 *1000, // 30 Days
      },
      store: store,

  })
);

app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
