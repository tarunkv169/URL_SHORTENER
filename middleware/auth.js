                          //🛑STATEFULL🛑


// const { GetUser } = require("../service_for_token/auth");

//        async function restrictToLoggedInUserOnly(req,res,next)
//        {
//           const UserId = req.cookies.uid;        // checking "id" directly form cookie where we put
//           if(!UserId)                            // to get "id" form cookie we need to parse it using "npm i cookie-paser"---> and middleware of this in index.js
//            { 
//               return res.redirect("/login");
//            }
       
//            const user = GetUser(UserId);
//            if(!user)
//            {
//               return res.redirect("/login");
//            }
       
//            req.user = user;
//            next();
//        }



//        async function checkAuth(req,res,next)
//        {
//           const UserId = req.cookies.uid;        // checking "id" directly form cookie where we put
//           const user = GetUser(UserId);
//            req.user = user;
//            next();
//        }

// module.exports = {
//     restrictToLoggedInUserOnly,
//     checkAuth
// }


                             //🛑STATELESS🛑

// const { GetUser } = require("../service_for_token/auth");

//        async function restrictToLoggedInUserOnly(req,res,next)
//        {
//           const UserId = req.cookies.token;        // checking "id" directly form cookie where we put
//           if(!UserId)                            // to get "id" form cookie we need to parse it using "npm i cookie-paser"---> and middleware of this in index.js
//            { 
//               return res.redirect("/login");
//            }
       
//            const user = GetUser(UserId);
//            if(!user)
//            {
//               return res.redirect("/login");
//            }
       
//            req.user = user;
//            next();
//        }



//        async function checkAuth(req,res,next)
//        {
//           const UserId = req.cookies.token;        // checking "id" directly form cookie where we put
//           const user = GetUser(UserId);
//            req.user = user;
//            next();
//        }

// module.exports = {
//     restrictToLoggedInUserOnly,
//     checkAuth
// }



                       // Refactoring middleware and Authorization

//Authorization---> someone/something is eligible for a particular thing or not
//Authentication---->he process of verifying identity

const { GetUser } = require("../service_for_token/auth");

    //check for authentication
    async  function checkforAuthentication(req,res,next)
    {                                            
        // dekh liya ki cookie hai ---check token---?(then "verify token"--redirect to "home"(next())) : (then redirect to "login"(next()))

        const tokencookie = req.cookies?.token;
        req.user = null;
        if(!tokencookie)
        {
            return next();
        }
        
        const token = tokencookie;
        const Userdetail = GetUser(token);

        req.user = Userdetail;

        return next();
        
    }

    //Authorization
    function  restrictToRoles(roles=[])
    {
        return function(req,res,next)
        {              // checking hamare "roles array" me "user requested role" include hai ya nhi
             if(!req.user){return res.redirect("/login")};

             if(!roles.includes(req.user.role)){return res.end("UnAuthorized")};

             return next();
        }
    }

module.exports={
    checkforAuthentication,
    restrictToRoles
}