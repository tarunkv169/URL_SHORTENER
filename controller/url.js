const URL = require('../models/url');
const shortid = require('shortid');




// Function to handle form submission and URL generation

     async function handleShortId(req, res) 
     {
         const body = req.body;
         if (!body.url) {
             return res.status(400).json({ error: "URL is required" });
         }
     
         const shortId = shortid.generate();
         await URL.create({
             shortId: shortId,
             redirectUrl: body.url,
             visitHistory: [],
             createdby: req.user._id
         });
         
         res.redirect(`/?id=${shortId}`);  /*<-------------✨✨🛑Explanation and Solution
                                                          When you submit a form, the browser sends a POST request to the server with the form data. If you then reload the page, the browser might attempt to resubmit the form data, causing the server to generate a new short URL for the same original URL. This is known as the "form resubmission problem."
                                                          
                                                          Solutions to Avoid Form Resubmission
                                                          POST-Redirect-GET (PRG) Pattern: After processing the form submission, redirect the user to another URL (typically a GET request) to prevent resubmission. This breaks the reload-resubmission cycle.
                                                          
                                                          Client-side Redirect: Use JavaScript to redirect the user after the form is successfully submitted.🛑✨✨*/
                                                  
     }
     
     
     
     
     
    //  async function handleRedirectToUrl(req, res) {
    //     console.log("hello");
    //      const shortId = req.params.shortId;
    //      const entry = await URL.findOneAndUpdate(
    //          { shortId },
    //          { $push: { visitHistory: { timestamp: Date.now() } } },
    //          { new: true }
    //      );
         
    //      console.log(entry);
    //      if (!entry) {
    //          return res.status(404).json({ error: "URL not found" });
    //      }
     
    //      res.redirect(entry.redirectUrl);
    //  }
     
     
     
     
     
     async function handleGetAnalytics(req, res) 
     {
         const shortId = req.params.shortId;
         const result = await URL.findOne({ shortId });
     
         if (!result) {
             return res.status(404).json({ error: "URL not found" });
         }
     
         return res.json({
             totalClicks: result.visitHistory.length,
             analytics: result.visitHistory
         });
     }
     

module.exports = {
    handleShortId,
    handleGetAnalytics
};
