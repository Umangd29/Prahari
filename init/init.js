// Import dependencies
const mongoose = require('mongoose');
const Report = require('../models/report.js');  // Mongoose model
const initData = require('./data.js');             // Sample data to seed DB

// ---------------------------------------------
// DATABASE CONNECTION
// ---------------------------------------------

const dbUrl = "mongodb://127.0.0.1:27017/prahari";

main()
    .then(() => {
        console.log("Prahari DB connected");
    })
    .catch((err) => {
        console.log("Connection error:", err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

// ---------------------------------------------
// SEED DATABASE FUNCTION
// ---------------------------------------------

const initDB = async () => {
    try {
        await Report.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj, owner: "68d143322ac28d9956d97839" }));
        await Report.insertMany(initData.data);
        console.log("Database seeded successfully");
    } catch (err) {
        console.log("Seeding error:", err);
    }
};

initDB();
