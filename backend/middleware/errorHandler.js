
// this is the global error handler
export const errorHandler = (err,req,res,next) =>{
    return res.status(err.statusCode).json({
        message:err.message
    });
}