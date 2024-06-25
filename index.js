const express = require("express");
  const {connectMongodb} = require('./connection');
  const urlRouter = require("./routes/url");
//   const {restrictToLoggedInUserOnly,checkAuth} = require("./middleware/auth");
  const {checkforAuthentication,restrictToRoles} = require("./middleware/auth");
  const cookieParser = require("cookie-parser");
  const URL = require('./models/url');
  const ejs = require('ejs');
  const path = require('path');
  const staticRouter = require("./routes/staticRoute");
  const userRouter = require("./routes/user");



const app = express();
const port = 8000;



  //  MONGODB CONNECTION

  connectMongodb("mongodb://127.0.0.1:27017/shortened_url")
  .then(()=>console.log({msg:"mongodb connected"}))
  .catch((err)=>console.log({msg:err}))





  //  MIDDLEWARE

  app.use(express.json());                        //middleware to parse the json data
  app.use(express.urlencoded({extended:false}));   //middleware to parse the form data
  app.use(cookieParser())                          //middleware to parse the cookie
  app.use(checkforAuthentication)                //middleware to check auth before login                         



  //   ROUTER'S
                                   // 🛑\/--this is our "server roles array"__with which we match our "requested user role"
  app.use('/url',restrictToRoles(["NORMAL","ADMIN"]),urlRouter);  //urlRouter--routes to url  
  app.use("/",staticRouter);                  //Static_routes---rendering is here
  app.use("/user",userRouter);                //userRouter--routes to user


  //   REDIRECT_URL--with shortid it directs to webpage
  app.get('/url/:shortId',async (req, res)=>
                          {
                               const shortId = req.params.shortId;
                               const entry = await URL.findOneAndUpdate(
                                   { shortId },
                                   { $push: { visitHistory: { timestamp: Date.now() } } },
                                   { new: true }
                               );
                               
                               console.log(entry);
                               if (!entry) {
                                   return res.status(404).json({ error: "URL not found" });
                               }
                           
                               res.redirect(entry.redirectUrl);
                           })
  





  //    ejs---SERVER SIDE RENDERING--(PUG,HANDLEOVER)
  
  app.set("view engine","ejs");             // tell application jo "engine" hamari website the view dikhayega wo "ejs" hoga  //ejs render our whole website on server and then show final output on frontend 
  app.set("views",path.resolve("./views"))  // tell path of ejs file



app.listen(port,()=>console.log(`server is listened at http://localhost:${port}`));