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
})

const Tripplan = mongoose.model("Tripplan", TripPlannerSchema);

export default Tripplan;
