const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not configured');
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        });
        isConnected = db.connections[0].readyState === 1;
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        throw err;
    }
};

module.exports = connectDB;
