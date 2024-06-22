const URL = require('../models/url');
const shortid = require('shortid');



async function handleShortId(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    // return res.json({ id: shortId });
    
    // const allUrls = await URL.find({}); // Fetch all URLs to include in the response
    // return res.render("home", { id: shortId, urls: allUrls });

    res.redirect(`/?id=${shortId}`);
}





async function handleRedirectToUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(entry.redirectUrl);
}





async function handleGetAnalytics(req, res) {
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


async function handleAllUsersURL(req,res){
    const allurls = await URL.find({});
    const id = req.query.id || null;
    return res.render("home",{ id, urls: allurls  });     // SSR on file("home", u can give data here to render out of file)
                                                              //                        ^---data send from here(from backend) will save in "locals"(which we can extract in ejs file)
}


module.exports = {
    handleShortId,
    handleRedirectToUrl,
    handleGetAnalytics,
    handleAllUsersURL
};
