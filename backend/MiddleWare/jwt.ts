import jwt from "jsonwebtoken";
require("dotenv").config();
const Secret_Token = process.env.ACCESS_TOKEN_SECRET


const getJWT = async (result:any) => {
    let data = {
        "user_id": result.user_id,
        "username": result.username,
        "user_role": result.user_role,
    };
    let expires = {expiresIn: "5h"}
    return await jwt.sign(data, Secret_Token, expires);
}

export {
    getJWT
}