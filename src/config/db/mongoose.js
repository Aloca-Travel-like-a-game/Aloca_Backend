import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@aloca.sdwmlji.mongodb.net/?retryWrites=true&w=majority`)
            .then(() => {
                console.log("Connect successfully");
            })

    }
    catch (err) {
        console.log(err);
    }
}

export default connect;