import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connect from "./config/db/mongoose.js";
import route from "./routers/index.js";
import bodyParser from "body-parser";

configDotenv();
connect();

const server = express();
server.use(bodyParser.json())
server.use(cors())
route(server)
server.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.PORT}`);
})