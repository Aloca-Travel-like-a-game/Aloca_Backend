import mongoose from "mongoose";

const responseSchema = mongoose.Schema({
    chatAiId: { type: mongoose.Schema.ObjectId, ref: "ChatAi" },
    content: String,
    createdAt: { type: Date, default: Date.now }
})

const Response = mongoose.model("Response", responseSchema);

export default Response;
