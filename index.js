const express = require("express");
const app = express();
const port = 8000;


  // mongodb connection
  const {connectMongodb} = require('./connection');
  connectMongodb("mongodb://127.0.0.1:27017/shortened_url")
  .then(()=>console.log({msg:"mongodb connected"}))
  .catch((err)=>console.log({msg:err}))





  // middleware
  app.use(express.json());                        //middleware to parse the json data
  app.use(express.urlencoded({extended:false}));   //middleware to parse the form data
  //middleware to parse the cookie
  const cookieParser = require("cookie-parser");
  app.use(cookieParser())                          




  //urlRouter--routes to url
  const urlRouter = require("./routes/url");
  const {restrictToLoggedInUserOnly,checkAuth} = require("./middleware/auth");
  app.use('/url',restrictToLoggedInUserOnly,urlRouter);




  //RedirectUrl--with shortid it directs to webpage
  const URL = require('./models/url');
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
  





  //ejs---SERVER SIDE RENDERING--(PUG,HANDLEOVER)
  const ejs = require('ejs');
  const path = require('path');
  app.set("view engine","ejs");             // tell application jo "engine" hamari website the view dikhayega wo "ejs" hoga  //ejs render our whole website on server and then show final output on frontend 
  app.set("views",path.resolve("./views"))  // tell path of ejs file




  //Static_routes---rendering is here
  const staticRouter = require("./routes/staticRoute");
  app.use("/",checkAuth,staticRouter);



  //userRouter--routes to user
  const userRouter = require("./routes/user");
  app.use("/user",userRouter);

  

  

app.listen(port,()=>console.log(`server is listened at http://localhost:${port}`));