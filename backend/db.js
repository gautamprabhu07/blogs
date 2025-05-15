const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogapp');
        console.log('Connection successful');
    } catch (err) {
        console.error('Connection ended, error:', err);
    }
}

connectDB();

module.exports = mongoose;
