const express = require("express");
const router = express.Router();
const {renderAllURL,renderSignUp,renderLogin} = require("../controller/staticControl");

// Route to render the form and display all URLs
   router.get('/',renderAllURL);

   router.get('/signup',renderSignUp)
   router.get('/login',renderLogin)

module.exports = router;