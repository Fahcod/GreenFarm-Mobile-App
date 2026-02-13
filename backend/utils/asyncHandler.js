
// this is a wrapper for all our async routes
export const asyncHandler = fn => (req,res,next) =>{
    fn(req,res,next).catch(next)
}