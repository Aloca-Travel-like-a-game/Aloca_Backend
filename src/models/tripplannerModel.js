import mongoose from "mongoose";

const TripPlannerSchema = mongoose.Schema({
    title: String,
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    startDate: Date,
    endDate: Date,
    location: String,
    imageUrl: String,
    transportCostTotal: Number,
    foodCostTotal: Number,
    notificationTime: Date,
    notificationSent: { type: Boolean, default: "False" }
})

const Tripplan = mongoose.model("Tripplan", TripPlannerSchema);

export default Tripplan;
