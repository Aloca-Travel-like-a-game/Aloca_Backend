import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const generateAccessToken = (user) => {
    return jwt.sign({
        userId: user._id
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3h"
    });
}
const generateRefreshToken = (user) => {
    return jwt.sign({
        userId: user._id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d"
    });

}

const verifyAccessToken = (access_token) => {
    let token = access_token
    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decoded;
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            const decoded = jwt.decode(token);
            return {
                exp: decoded.exp,
                userId: decoded.userId
            }
        }
    }
}

const verifyRefreshToken = (refresh_token) => {
    try {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const decoded = jwt.verify(refresh_token, secret);
        return decoded;
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return {
                expired: true
            }
        }
        console.log(err);
    }
}

export {
    verifyAccessToken,
    verifyRefreshToken,
    generateAccessToken,
    generateRefreshToken
}