const URL = require('../models/url');



   // Function to render the form and show all URLs without generating a new one
        
   async function renderAllURL(req,res)
   {
       if(!req.user){return res.redirect("/login")}
       const allurls = await URL.find({createdby:req.user._id});
       const id = req.query.id || null;
       return res.render("home",{ id, urls: allurls  });     // SSR on file("home", u can give data here to render out of file)
                                                                 //                        ^---data send from here(from backend) will save in "locals"(which we can extract in ejs file)
   }



   async function renderSignUp(req,res)
   {
      return res.render("signup");
   }

   async function renderLogin(req,res)
   {
      return res.render("login")
   }


module.exports = {
    renderAllURL,
    renderSignUp,
    renderLogin
}