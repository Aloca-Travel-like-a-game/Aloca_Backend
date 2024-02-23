import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required field!"],
        unique: true,
        lowercase: true
    },
    fullname: String,
    email: {
        type: String,
        required: [true, "Email is required field!"],
        unique: true,
        lowercase: true
    },
    image: {
        type: String,
        default: ""
    },
    backgroundImage: {
        type: String,
        default: ""
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

UserSchema.pre("save", function (next) {
    if (!this.fullname) {
        this.fullname = this.username;
    }
    next();
})

const User = mongoose.model("User", UserSchema);


export default User;
