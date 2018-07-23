require('dotenv').load();
const jwt = require("jsonwebtoken");

//Make sure User is Logged In - Authenticaiton
exports.loginRequired = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded) {
                return next();
            } else {
                return next ({
                    status: 401,
                    message: "Please log in first"
                });
            }
        })
    } catch(err){
        return next({
            status: 401,
            message: "Please log in first"
        })
    }
}

//Make sure we get the correction user - Authorization
exports.ensureCorrectUser = function(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.id) {
                return next();
            } else {
                return next ({
                    status: 401, 
                    message: "Unauthorizaed"
                })
            }
        });
    } catch(err){
        return next ({
            status: 401, 
            message: "Unauthorizaed"
        })
    }
}