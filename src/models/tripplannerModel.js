import mongoose from "mongoose";

const TripPlannerSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    statDate: Date,
    endDate: Date,
    locatrion: String,
    imageUrl: String,
    transportCostTotal: Number,
    foodCostTotal: Number,
    nameTrip: String
})

const Tripplan = mongoose.model("Tripplan", TripPlannerSchema);

export default Tripplan;
