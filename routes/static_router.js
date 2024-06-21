const express = require("express");
const router = express.Router();
const {handleAllUsersURL} = require("../controller/url");

   router.get('/',handleAllUsersURL);

module.exports = router;