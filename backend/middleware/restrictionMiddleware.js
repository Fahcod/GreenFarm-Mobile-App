
/********************************************************************************
 * This middleware is to be used to restrict some routes to only specific users
 * like business owners or admins and farmers themselves
 */
export const restrictTo = (roles_array) =>{
    return (req,res,next) =>{
    // if the user role is not conained in the roles_array, they are not allowed to access
    //the route and its functionaity
    if(!roles_array.includes(req.user.role)){
       return res.status(400).json({message:"You are not allowed to access this functionality"})
    }
    // else, call the next middleware or route handler
    next()
    }
}