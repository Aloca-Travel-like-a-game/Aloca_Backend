import mongoose from "mongoose";

const ChallengeSchema = mongoose.Schema({
    date: Date,
    tripId: { type: mongoose.Schema.ObjectId, ref: "Tripplan" },
    title: String,
    transportCost: Number,
    foodCost: Number
})

const Challenge = mongoose.model("Challenge", ChallengeSchema);

export default Challenge;
