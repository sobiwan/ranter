function errorHandler(error, req, res, next){
    return res.status(error.status || 500).json({
        error: {
        message: error.message || "Oh No! Something went wrong!"
        }
    });
}

module.exports = errorHandler;