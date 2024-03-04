import mongoose from "mongoose";

const TripDaySchema = mongoose.Schema({
    tripId: { type: mongoose.Schema.ObjectId, ref: "Tripplan" },
    day: Number,
    date: Date,
    location: String,
    title: String,
    transportCost: Number,
    foodCost: Number
})

const TripDay = mongoose.model("TripDay", TripDaySchema);

export default TripDay;