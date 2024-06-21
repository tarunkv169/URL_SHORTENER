const express = require("express");
const router = express.Router();
const { handleShortId, handleGetAnalytics,handleRedirectToUrl} = require("../controller/url");



   router.post('/url', handleShortId);
   router.get('/:shortId', handleRedirectToUrl);
   router.get('/analytics/:shortId', handleGetAnalytics);
   
   


module.exports = router;
