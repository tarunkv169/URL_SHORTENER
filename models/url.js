const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
    shortId:{
        "type":"string",
        "required":"true"
    },
    redirectUrl:{
        "type":"string",
        "required":"true"
    },
    visitHistory: [{
        timestamp: {
            "type": "Date"
        }
    }]


},{timestamps:true} )


const URL = mongoose.model('URL',mySchema);
module.exports = URL