const db = require("../models"),
      jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next){
    //finding a user
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let {id, username, profileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id, 
                username,
                profileImageUrl
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id, 
                username,
                profileImageUrl, 
                token
            });
        } else {
            return next ({
                status: 400,
                message: "Invalid Email/Password"
            });
        }
    } catch (e) {
        return next ({
            status: 400,
            message: `Email/Password failed - the issue is ${e.message}`
        });
    }
    // checking if their password matches. what was sent to server
    //if matches => log them in
};

exports.signup = async function (req, res, next){
    try {
        //create user
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl} = user
        let token = jwt.sign(
            {
                id,
                username,
                profileImageUrl
            },
        //create token
            //get from process.env.SECRET_KEY
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        })
    } catch(err){
        //see what kind of error
        //if certain kind of error
        //username/email taken
        //otherwsie send generic 400
        if(err.code === 110000){
            err.message = "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400, 
            message: err.message
        })
    }
}