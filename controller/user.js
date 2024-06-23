const User = require('../models/user'); // Ensure the correct path
const {v4: uuidv4} = require("uuid")
const {SetUser,GetUser} = require("../service/auth");


     async function handleSignUp(req, res) 
     {
         const { name, email, password } = req.body;
         
         try {
             const SignUpUser = await User.create({
                 name,
                 email,
                 password
             });
     
             if (!SignUpUser) {
                 return res.status(404).json({ err: "not found" });
             }
             
             
             return res.redirect('/');
     
     
         } catch (error) {
             console.error('Error creating user:', error);
             return res.status(500).json({ err: "Internal server error" });
         }
     }


     async function handleLogin(req,res)
     {  
        const {email,password}= req.body;
        const LogInUser = await User.findOne({
            email,
            password
        })

        if(!LogInUser)
        {
            return res.render("login",{
                err:"Invalid Username and password"
            });
        }



        // creating id and mapping it with particular user
        const sessionid = uuidv4();

        //understand it with example of car parking
        // require the auth of service folder ^  -----i.e reach the cabin
        SetUser(sessionid,LogInUser);         // in this we registor our id
        res.cookie("uid",sessionid);          // we put our id in cookie bucket
       
        return res.redirect("/")  // redirect update the url and render update the webpage to ejs file

     }





module.exports = { 
    handleSignUp,
    handleLogin
 };