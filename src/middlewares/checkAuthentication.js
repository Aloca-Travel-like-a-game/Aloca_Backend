import User from "../models/userModel.js";
import { verifyAccessToken } from "../helper/jwt.js";
import checkRefreshToken from "./checkRefreshToken.js";
const checkAuthentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenArray = token.split(' ');
        const accessToken = tokenArray[1];
        const decoded = verifyAccessToken(accessToken);
        if (!token) {
            return res.status(401).send("Your token not found");
        }

        if (decoded.exp == true) {
            req.userId = decoded.userId;
            return checkRefreshToken(req, res, next);
        }
        const user = await User.findById(decoded.userId);

        if (!user || user.isActive !== "active") {
            return res.status(401).send("User not found");
        }

        req.userData = user;
        console.log("Token are still valid");
        next()
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error")
    }
}

export default checkAuthentication;