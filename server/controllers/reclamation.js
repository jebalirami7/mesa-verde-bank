const mongoose = require('mongoose');
const Reclamation = require('../models/reclamation'); 

exports.getAllRec = (req, res, next ) => {
    Reclamation.find().exec().then( docs => {
        res.status(200).json({
            message: 'Reclamations trouvées : ',
            reclamations: docs,
        });
    }).catch(err => {
        res.status(500).json({
            error: 'Une erreur a survenu pendant la recherche des reclamations',
        });
    })
};



exports.getReclamation = (req, res, next ) => {
    const id = req.params.id;
    Reclamation.findById(id).exec().then( doc => {
        console.log(doc);
        res.status(200).json({
            message: 'Reclamation trouvée',
            reclamation: doc,
        });
    }).catch(err => {
        res.status(500).json({
            error: 'Une erreur a survenu pendant la recherche de la reclamation',
        });
    })
};



exports.createReclamation = (req, res, next ) => {
    const reclamation = new Reclamation({
        _id: new mongoose.Types.ObjectId(),
        sujet: req.body.sujet,
        cin_client: req.body.client,
        description: req.body.description,
        date: req.body.date,
        etat: 'Nouveau',
    });

    reclamation.save().then((result) => {
        res.status(201).json({
            message: 'Reclamation creé',
            id: result._id,
        });
    }).catch((err)=>{
        res.status(500).json({
            error: 'Une erreur a survenu pendant la creation de la reclamation',
            description: err,
        });
    })


};