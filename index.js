const express = require("express");
const app = express();
const port = 8000;

  // mongodb connection
  const {connectMongodb} = require('./connection');

  connectMongodb("mongodb://127.0.0.1:27017/url_shortener_database")
  .then(()=>console.log({msg:"mongodb connected"}))
  .catch((err)=>console.log({msg:err}))


  // middleware
  app.use(express.json());                        //middleware to parse the json data
  app.use(express.urlencoded({extended:false}));   //middleware to parse the form data


  //router
  const urlRouter = require("./routes/url");
  app.use('/',urlRouter);
  

  //ejs---SERVER SIDE RENDERING--(PUG,HANDLEOVER)
  const ejs = require('ejs');
  const path = require('path');
  const staticRouter = require("./routes/static_router");

  app.set("view engine","ejs");             // tell application jo "engine" hamari website the view dikhayega wo "ejs" hoga  //ejs render our whole website on server and then show final output on frontend 
  app.set("views",path.resolve("./views"))  // tell path of ejs file

  app.use("/",staticRouter);

  

  

app.listen(port,()=>console.log(`server is listened at http://localhost:${port}`));