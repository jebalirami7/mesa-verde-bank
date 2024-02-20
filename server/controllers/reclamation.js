const mongoose = require('mongoose');
const Reclamation = require('../models/reclamation'); 

exports.getAllRec = (req, res, next ) => {
    const condition = {};
    const status = req.params.id;
    if (status == "in-progress") 
        condition.status = "En Attente";
    else if (status == "accepted") 
        condition.status = "Traitée";
    else if (status == "rejected") 
        condition.status = "Rejetée";

    if (req.user.role === "client") 
        condition.cin_client = req.user.cin;

    Reclamation.find(condition).exec().then( docs => {
        docs.forEach( doc => {
            let numToStr = doc.cin_client.toString();
            let length = numToStr.length;
            doc.cin_client = parseInt( numToStr.substring(length - 3, length), 10 );
        });
        res.status(200).json({
            message: 'Reclamations trouvées : ',
            reclamations: docs,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'Une erreur a survenu pendant la recherche des reclamations',
        });
    })
};


exports.getCount = (req, res, next ) => {
    const conditions = [
        { status: "En Attente" },
        { status: "Traitée" },
        { status: "Rejetée" }
    ];

    if (req.user.role === "client")
        for(let condition of conditions) 
            condition.cin_client = req.user.cin;

    Promise.all([
        Reclamation.countDocuments(conditions[0]),
        Reclamation.countDocuments(conditions[1]),
        Reclamation.countDocuments(conditions[2])
    ])
    .then(([inProgressCount, acceptedCount, rejectedCount]) => {
        res.status(200).json({
            message: 'Nombre de reclamations trouvées : ',
            count: {
                inProgress: inProgressCount,
                accepted: acceptedCount,
                rejected: rejectedCount
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'Une erreur a survenu pendant le calcul de nombre des reclamations',
        });
    });
};


exports.getReclamation = (req, res, next ) => {
    const id = req.params.id;
    Reclamation.findById(id).exec().then( doc => {
        let numToStr = doc.cin_client.toString();
        let length = numToStr.length;
        doc.cin_client = parseInt( numToStr.substring(length - 3, length), 10 );
        res.status(200).json({
            message: 'Reclamation trouvée',
            reclamation: doc,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'Une erreur a survenu pendant la recherche de la reclamation',
        });
    })
};


exports.createReclamation = (req, res, next ) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const reclamation = new Reclamation({
        _id: new mongoose.Types.ObjectId(),
        subject: req.body.subject,
        cin_client: req.user.cin,
        description: req.body.description,
        date: day + '-' + month + '-' + year,
        status: 'En Attente',
    });

    reclamation.save().then((result) => {
        res.status(201).json({
            message: 'Reclamation creé',
            id: result._id,
        });
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            error: 'Une erreur a survenu pendant la creation de la reclamation',
            description: err,
        });
    })
};


exports.editReclamation = (req, res, next ) => {
    const id = req.params.id;
    const newStatus = req.body.status;
    Reclamation.findById(id).exec().then( doc => {
        if (doc.status === "En Attente") {
            Reclamation.findOneAndUpdate({ _id: id }, { $set: { status: newStatus } }, { new: true })
                .then(updatedDocument => {
                    res.status(200).json(updatedDocument);
                }).catch(error => {
                    console.error(error);
                    res.status(500).json({
                        error: 'Une erreur a survenu pendant la modification de la reclamation',
                    });
                });
        } else {
            res.status(201).json({message: "On ne peut que modifier les reclamations en attente"})
        }
    
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'Une erreur a survenu pendant la recherche de la reclamation',
        });
    })
};


exports.deleteReclamation = (req, res, next ) => {
    const id = req.params.id;
    Reclamation.findByIdAndDelete(id).exec().then( doc => {
        res.status(200).json({
            message: 'Reclamation supprimée',
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'Une erreur a survenu pendant la suppression de la reclamation',
        });
    })
};


exports.deleteAllReclamation = (req, res, next ) => {
    Reclamation.deleteMany({}).exec().then( doc => {
        res.status(200).json({
            message: 'Tous les reclamations sont supprimées',
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'Une erreur a survenu pendant la suppression des reclamations',
        });
    })
};



function generateReclamations(res, numReclamations) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const reclamations=[];
    for (let i = 0; i < numReclamations; i++) {
        const reclamation = {
            _id: new mongoose.Types.ObjectId(),
            date: day + '-' + month + '-' + year,
            status: 'En Attente',
            subject: `Sujet de la réclamation ${i + 1}`,
            cin_client: Math.floor(10000000 + Math.random() * 90000000), // Nombre aléatoire de 8 chiffres
            description: `Description de la réclamation ${i + 1}\nLorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptate inventore quidem possimus odit voluptas temporibus pariatur culpa, optio ipsa dolore cum qui consectetur alias minima impedit, officia facilis tempore?`
        };
        reclamations.push(reclamation)
    }
    // console.log(JSON.stringify(reclamations, null, 2));
    Reclamation.create(reclamations)
        .then((createdReclamations) => {
            console.log('Reclamations created successfully:', createdReclamations);
            res.status(200).json({message: 'okay'})
        })
        .catch((error) => {
            console.error('Error creating reclamations:', error);
            res.status(500).json({message: 'err'})

        });
}