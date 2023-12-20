const express = require('express');
const controller = require('../controllers/reclamation');

const router = express.Router();

router.get('/', controller.getAllRec);
router.get('/:id', controller.getReclamation);
router.post('/', controller.createReclamation);
router.patch('/:id', controller.editReclamation);
router.delete('/:id', controller.deleteReclamation);
router.delete('/', controller.deleteAllReclamation);

module.exports = router ;