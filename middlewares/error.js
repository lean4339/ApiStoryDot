const { stack } = require("../routes/productsRouter");

function logErrors(err,req,res,next){
 console.log(err);
 next(err);
}
function boomErrorHandler(err,req,res,next){
    if(err.isBoom){
        const {output} = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

function errorHandler(err,req,res,next){
    res.status(500).json({
        mensaje: err.message,
        stack: err.stack
    })
}

module.exports = {logErrors, errorHandler,boomErrorHandler};