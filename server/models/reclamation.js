const mongoose = require('mongoose');


const reclamationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: String,
    cin_client: Number,
    description: String,
    date: String,
    status: String,
});

module.exports = mongoose.model('Reclamation', reclamationSchema) ; 