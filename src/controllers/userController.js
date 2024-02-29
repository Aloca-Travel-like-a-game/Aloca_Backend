import User from "../models/userModel.js";
const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phone, address, image } = req.body;
        const userId = req.userData._id;
        if (!fullname === undefined || !email === undefined || !phone === undefined || !address === undefined || !image === undefined) {
            return res.status(400).json({ message: "Please provide full information fullname, email, phone, address" })
        }
        if (isNaN(phone)) {
            return res.status(400).json({ message: "Phone number must be a valid number" });
        }
        await User.findByIdAndUpdate(userId, { fullname, email, phone, address, image })
        return res.status(200).json({ message: "Update profile successfully" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { updateProfile };