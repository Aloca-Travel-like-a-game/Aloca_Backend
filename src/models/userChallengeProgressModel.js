import mongoose from "mongoose";

const UserChallengeProgressSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    chaId: { type: mongoose.Schema.ObjectId, ref: "Challenge" },
    completed: { type: Boolean, default: false },
    // createdAt: Date.now,
    // updatedAt: Date.now
})

const UserChallengProgress = mongoose.model("UserChallengProgress", UserChallengeProgressSchema);

export default UserChallengProgress;
