const passport = require("passport");

// Return the routes

module.exports = app => {
  app.get("/auth/google", passport.authenticate("google",{
    scope: ["profile", "email"],
  }));
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  
  app.get('/', (req, res) => {
    res.send({"message":"I am Live"})
  });

  app.get('/api/current_user',(req,res)=>{
    // console.log('/api/current_user req',req,'\nres',res)
    res.send({user:req.user,session:req.session})
  });

  app.get('/api/logout',(req,res,next)=>{
    req.logout((err)=>{
      if (err){
        return next(err);
      }
    });
    res.send(req.user)
  });

}