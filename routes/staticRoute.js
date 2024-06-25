const express = require("express");
const router = express.Router();
const {renderAllURL,renderParticularUserURL,renderSignUp,renderLogin} = require("../controller/staticControl");
const { restrictToRoles } = require("../middleware/auth");

// Route to render the form and display all URLs
   router.get('/admin/urls',restrictToRoles(["ADMIN"]),renderAllURL);

   router.get('/',restrictToRoles(["NORMAL","ADMIN"]),renderParticularUserURL);      // 🛑here we give "urls" of particular "user",,so need of "middleware" of particular "role" so go to 🛑"Staticrouter"

   router.get('/signup',renderSignUp)
   router.get('/login',renderLogin)

module.exports = router;