import mongoose from "mongoose";

const ChallengeSchema = mongoose.Schema({
    tripDayId: { type: mongoose.Schema.ObjectId, ref: "Tripplan" },
    challengeSummary: String,
    location: String,
    points: Number,
    imageUrl: String,
    // createdAt: Date.now()
})

const Challenge = mongoose.model("Challenge", ChallengeSchema);

export default Challenge;
