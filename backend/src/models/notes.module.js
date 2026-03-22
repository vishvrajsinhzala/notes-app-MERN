const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Notes=mongoose.model('Notes',noteSchema);

module.exports=Notes;