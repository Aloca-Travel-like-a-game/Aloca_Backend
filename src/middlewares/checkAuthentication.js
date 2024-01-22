const checkAuthentication = async (req, res, next) => {
    try {
        const token = req.headers.cookie;
        const cookies = cookie.parse(token || '');
        const accessToken = cookies.accesstoken;

        const decoded = verifyAccessToken(accessToken);

        if (!token) {
            return res.status(401).send("Your token not found");
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
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