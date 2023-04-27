# Concept

## How to call Routes from different file ExpressJS

    In file authRoutes.js

    ```js
    // Return the routes
    module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
        scope: ["profile", "email"],
        })
    );

    app.get("/auth/google/callback", passport.authenticate("google"));

    app.get("/", (req, res) => {
        res.send({ message: "I am Live" });
    });
    };
    ```

    To Call auth Routes in file index.js (root)


    ```js
    const express = require("express");
    
    const authRoutes =  require('./routes/authRoutes');
    
    const app = express(); 
    
    authRoutes(app);

    ```
    Another Method To call

    When we `require('./routes/authRoutes')` it return a function and then we immediate call with app


    ```js
    
    const express = require("express");
    
    const app = express(); 
    
    require('./routes/authRoutes')(app);
    
    
    ```

## What we loose in Mongoose

    In MongoDB we cam have random values in collection of each records 

    Every records have unqiue values

    {
        id:1
        height:256
    } 
    {
        id:2
        weight:90
    } 
    {
        id:3
        age:40
    } 
    
    Notices that each have different values which do not exist in eachother age,height,weight

    But How ever when we use mongoose we loose that ability.

    Mongoose want to know all of it values with different property in records we have in db 

