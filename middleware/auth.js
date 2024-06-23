const { GetUser } = require("../service/auth");

       async function restrictToLoggedInUserOnly(req,res,next)
       {
          const UserId = req.cookies.uid;        // checking "id" directly form cookie where we put
          if(!UserId)                            // to get "id" form cookie we need to parse it using "npm i cookie-paser"---> and middleware of this in index.js
           { 
              return res.redirect("/login");
           }
       
           const user = GetUser(UserId);
           if(!user)
           {
              return res.redirect("/login");
           }
       
           req.user = user;
           next();
       }



       async function checkAuth(req,res,next)
       {
          const UserId = req.cookies.uid;        // checking "id" directly form cookie where we put
          const user = GetUser(UserId);
           req.user = user;
           next();
       }

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}