import { configDotenv } from "dotenv";
configDotenv();

const rankPerMonth = async (req, res) => {
    try {
        const { typeRank, } = req.body;
        const dateNow = Date.now;
        console.log(dateNow);
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
