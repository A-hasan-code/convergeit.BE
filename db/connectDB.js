const mongoose = require("mongoose");

const connectDB =  async () => {
    try {
        const DBConnection = await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log(`MongoDB Connected: ${DBConnection.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;