const mongoose = require('mongoose');


const reclamationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sujet: String,
    cin_client: Number,
    description: String,
    date: mongoose.Schema.Types.Date,
    etat: String,
});

module.exports = mongoose.model('Reclamation', reclamationSchema) ; 