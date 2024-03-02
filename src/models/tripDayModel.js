import mongoose from "mongoose";

const TripDaySchema = mongoose.Schema({
    day: Date,
    tripId: { type: mongoose.Schema.ObjectId, ref: "Tripplan" },
    location: String,
    title: String,
    transportCost: Number,
    foodCost: Number
})

const TripDay = mongoose.model("TripDay", TripDaySchema);

export default TripDay;
