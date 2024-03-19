import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connect from "./config/db/mongoose.js";
import route from "./routers/index.js";
import bodyParser from "body-parser";
import morgan from "morgan";
configDotenv();
connect();

const server = express();
server.use(bodyParser.json())
server.use(cors())
server.use(morgan());
const sendNotification = async () => {
    try {
        await firebase.messaging().send({
            token: "e52m1qpHSParXuBGIczJH9:APA91bGZMpjVMTQjBf_HDWUP16QW7-Jx40FCxokXUS5ecryC443MYlLuwfKoiMmRcGcmqqElRNPfmc3HA1fzcZjLGyyXiNBkk6WEjysKn8uq4Cz40TNIDodtpvN4xLdLmMNKjs-Ijubf",
            notification: {
                title: "khanh",
                body: "khanhdeptrai"
            }
        })
        console.log("send notification successfully");
    } catch (error) {
        console.log("send fail", error);
    }
}
setTimeout(() => {
    sendNotification();
}, 2000);
route(server)
server.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.PORT}`);
})
