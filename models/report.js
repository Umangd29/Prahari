const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reportSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,

    image: {
        filename: String,
        url: String,
    },

    location: String,
    state: String,

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    category: {
        type: String,
        enum: [
            "Tsunami",
            "Hurricanes",
            "Cyclones",
            "Typhoons",
            "Whirlpool",
            "Sea-Level-Rise",
            "Other"
        ],
        required: true
    },
     date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Report", reportSchema);