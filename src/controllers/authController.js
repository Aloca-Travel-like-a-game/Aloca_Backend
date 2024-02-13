import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendVerificationCodeEmail from "../email/sendVerificationCodeEmail.js";
import { generateAccessToken, generateRefreshToken } from "../helper/jwt.js";
import { generateVerificationCode } from "../helper/verificationCode.js";
const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!username || !password || !email) {
            return res.status(401).json({
                message: "Username, email or password not found"
            });
        }
        const checkUser = await User.findOne({
            $or: [
                { "username": username },
                { "email": email }
            ]
        })
        if (checkUser) {
            return res.status(401).json({
                message: "Username or email already exist"
            });
        }
        if (password !== confirmPassword) {
            return res.status(401).json({
                message: "Pasword and Confirm Password do not match"
            });
        }
        const verificationCode = generateVerificationCode();
        const hashedPassword = await bcrypt.hash(password, 10);
        sendVerificationCodeEmail(email, verificationCode);
        const newUser = new User({ username, email, password: hashedPassword, code: verificationCode })
        await newUser.save();

        return res.status(200).json({
            message: "Registration successful. Check your email to verify your account",
            email: email
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const confirmAccount = async (req, res) => {
    try {
        const { code } = req.body;
        const checkVerifiCode = await User.findOne({ code: code })
        if (!checkVerifiCode) {
            return res.status(401).json({
                message: "Your code is not correct"
            })
        }
        await User.findOneAndUpdate({ _id: checkVerifiCode._id }, { isActive: "active", code: "" });

        return res.status(200).json({
            message: "Verification successful. Your account is now active"
        })
    }
    catch (err) {
        console.log(err);
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const checkAccount = await User.findOne({ username })
        if (!checkAccount) {
            return res.status(404).json({ message: "The account is not registered" })
        }
        if (checkAccount.isActive == "delete") {
            return res.status(400).json({ message: "The account has been deleted" })
        } else if (checkAccount.isActive == "notActive") {
            return res.status(404).json({ message: "Unverified account" })
        }
        if (!password) {
            return res.status(404).json({ message: "Password not found" })
        }
        const validPassword = await bcrypt.compare(password, checkAccount.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        if (checkAccount && validPassword) {
            const accessToken = generateAccessToken(checkAccount);
            const refreshToken = generateRefreshToken(checkAccount);
            await User.findOneAndUpdate({
                username: username
            }, {
                refreshToken: refreshToken
            });
            return res.status(200).json({
                message: "Login successfully",
                accessToken: accessToken
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const refreshVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUser = await User.findOne({ email: email })

        if (!checkUser) {
            return res.status(401).json({ message: "Your account not exist" })
        }

        const newVerificationCode = generateVerificationCode();
        await User.updateOne({
            code: newVerificationCode
        })

        return res.status(200).json({ message: "The new code was successfully generated" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUser = await User.findOne({ email })
        if (!checkUser) {
            return res.status(401).json({ message: "The email is not exist" });
        }
        if (checkUser.isActive == "notActive") {

        }
        else if (checkUser.isActive == "delete") {

        }
        const verificationCode = generateVerificationCode();
        sendVerificationCodeEmail(email, verificationCode);
        await User.updateOne({
            code: verificationCode
        })
        return res.status(200).json({ message: "The new code was successfully generated" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Servel Error" });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        const checkUser = await User.findOne({ code: token });

        if (!checkUser) {
            return res.status(401).json({ message: "The account is not exist" });
        }

        if (password !== confirmPassword) {
            return res.status(401).json({ message: "Password and Confirm Password do not match" })
        }

        await User.findOneAndUpdate({ _id: checkUser._id }, { password, code: "" });
        return res.status(200).json({ message: "Update password successfully" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Servel Error" });
    }
}

const refreshToken = async (req, res) => {
    try {
        const { token } = req.params;
        if(!refreshToken);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Servel Error" });
    }
}

export {
    register,
    confirmAccount,
    refreshVerificationCode,
    login,
    forgotPassword,
    resetPassword,
    refreshToken
}