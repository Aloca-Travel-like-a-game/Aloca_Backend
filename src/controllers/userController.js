import User from "../models/userModel.js";
const getProfile = async (req, res) => {
    try {
        const userId = req.userData._id;
        const userData = await User.findById(userId);
        if (!userData) {
            return res.status(401).json({ message: "User not found" })
        }
        const userDatas = {
            fullname: userData.fullname,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
        }
        return res.status(200).json({ message: "get data user successfully", data: userDatas })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { getProfile };