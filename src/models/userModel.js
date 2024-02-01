import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required field!"],
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required field!"],
        unique: true,
        lowercase: true
    },
    phone: {
        type: Number
    },
    city: { type: String },
    level: {
        type: Number,
        default: 1
    },
    experience:
    {
        type: Number,
        default: 0,
    },

    password: {
        type: String,
        required: [true, "Password is required field!"],
    },
    code: String,
    isActive: { type: String, default: "notActive" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    role: {
        type: String,
        default: "user"
    },
    refreshToken: String,
})

const User = mongoose.model("User", UserSchema);

export default User;
