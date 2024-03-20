import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connect from "./config/db/mongoose.js";
import route from "./routers/index.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import { firebase } from "./firebase/index.js";
configDotenv();
connect();

const server = express();
server.use(bodyParser.json())
server.use(cors())
server.use(morgan());
// const sendNotification = async () => {
//     try {
//         await firebase.messaging().send({
//             token: "e1SplqtlTXeKVCGIR-fHtk:APA91bH75TQP3Ds5mAMWZEWizEzfoeT6mbSYaULFY7sfNR3FmgyZ0qd7CunB9SDNSkj0bTVgC9iJE5XJVYSH9SWDy03wN0uiGMLT_9O5CuoVub5aM9WZ731-7o9slcW8VbNeOuv0JqRR",
//             notification: {
//                 title: "khanh",
//                 body: "khanhdeptrai"
//             }
//         })
//         console.log("send notification successfully");
//     } catch (error) {
//         console.log("send fail", error);
//     }
// }

// setTimeout(() => {
//     sendNotification();
// }, 2000);

route(server)
server.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.PORT}`);
})
