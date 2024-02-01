import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

const sendVerificationCodeEmail = (userEmail, verificationCode) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST_MAIL,
        port: process.env.PORT_MAIL,
        auth: {
            user: process.env.USERNAME_MAIL,
            pass: process.env.PASSWORD_MAIL
        }
    })

    const mailOptions = {
        from: "Admin@aloca.com",
        to: userEmail,
        subject: "Xác nhận tài khoản",
        text: `Mã xác nhận tài khoản của bạn là ${verificationCode}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent " + info.response);
        }
    })
}

export default sendVerificationCodeEmail