const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      // scope: [ 'profile','email' ],
      // state: true
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(
        "accessToken : ", accessToken,
        "\nrefreshToken : ", refreshToken,
        "\n profile : ", profile,
        " \ndone : ", done
      );
    }
  )
);

app.get("/auth/google", passport.authenticate("google",{
  scope: ["profile", "email"],
}));

app.get("/auth/google/callback", passport.authenticate("google"));

// app.get('/', (req, res) => {
//   res.send({"message":"I am Live"})
// })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
