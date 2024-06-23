const express = require("express");
const router = express.Router();
const { handleShortId, handleGetAnalytics} = require("../controller/url");


// Route to handle form submission and URL generation
   router.post('/', handleShortId);
   router.get('/url/analytics/:shortId', handleGetAnalytics);
   
   


module.exports = router;
