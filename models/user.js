const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // prevent duplicate emails
        lowercase: true, // store in lowercase
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    aadharNum: {
        type: String, // store as String to keep leading zeros
        required: true,
        match: [/^\d{12}$/, "Aadhar number must be exactly 12 digits"],
    },
    phoneNum: {
        type: String, // phone numbers are safer as strings
        required: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"], // optional check
    },
    userRole: {
        type: String,
        required: true,
        enum: ["citizen", "volunteer", "disaster manager", "coastal residence", "admin"],
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
