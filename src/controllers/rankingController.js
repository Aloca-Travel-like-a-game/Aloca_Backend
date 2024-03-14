import { configDotenv } from "dotenv";
import Challenge from "../models/challengeModel.js";
configDotenv();

const rankPerMonth = async (req, res) => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        console.log(currentMonth);
        const challenges = await Challenge.find({ $and: [{ month }] })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}

const rankPerWeek = async () => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Servel Error!" });
    }
}

const rankingUserHighest = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Servel Error!" });
    }
}

export {
    rankPerMonth,
    rankPerWeek,
    rankingUserHighest
}
