const mongoose = require('mongoose');

async function ConnectDb() {
    await mongoose.connect('mongodb://localhost:27017/notes');
    console.log('Connected to MongoDB'); 
}
module.exports=ConnectDb;