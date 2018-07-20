const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/ranter", {
    keepAlive: true,
    userMongoClient: true
});

module.exports.User = require("./user");