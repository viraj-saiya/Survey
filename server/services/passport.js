const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/keys");

const User = mongoose.model('user');




const addUser = async(profile,done) => {
  // console.log("profile",profile)
    const existingUser = await User.findOne({googleId : profile.id });

    if (existingUser) {
      console.log("existingUser",existingUser)
        done(null,existingUser);
    }
    
    console.log("existingUser",existingUser);
    
    if (!existingUser) {
      const user = await new User( { googleId : profile.id }).save();
      console.log ('user', user);
      
      done(null,user);
    }
    
}

passport.serializeUser((user,done)=>{
  console.log("serializer get mongoDB generated id",user);

  done(null,user.id);
})

passport.deserializeUser((id,done)=>{
  
  User.findById(id).then((user)=>{
    console.log('deserializer id',id )
    done(null,user);
  })
})


passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        // scope: [ 'profile','email' ],
        // state: true
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("done",done);
        addUser(profile,done);
        // console.log("profile",profile)
        // console.log(
        //   "accessToken : ", accessToken,
        //   "\nrefreshToken : ", refreshToken,
        //   "\n profile : ", profile,
        //   " \ndone : ", done
        // );
      }
    )
  );
  