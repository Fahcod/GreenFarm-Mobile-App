
// this is a wrapper for all our async routes
export const asyncHandler = fn => (req,res,next) =>{
    Promise.resolve(fn(req,res,next)).catch(next)
}