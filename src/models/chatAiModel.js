import mongoose from "mongoose";

const ChatAirSchema = mongoose.Schema({
    title: String,
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
})

const ChatAi = mongoose.model("ChatAi", ChatAirSchema);

export default ChatAi;
