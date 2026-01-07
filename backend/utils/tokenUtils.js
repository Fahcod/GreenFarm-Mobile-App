import jwt from "jsonwebtoken";


// create an access token
export const createAccessToken = (id) =>{
    const jwt_token = jwt.sign({id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10d'});
    return jwt_token
}

// create a refresh token
export const createRefreshToken = (id) =>{
    const jwt_token = jwt.sign({id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'});
    return jwt_token
}