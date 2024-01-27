const express = require('express');
const controller = require('../controllers/reclamation');
const checkAuth = require('../middlewares/checkAuth');
const router = express.Router();

router.get('/getAll', checkAuth , controller.getAllRec);
router.get('/getAll/:id', checkAuth , controller.getAllRec);
router.get('/getOne/:id', checkAuth , controller.getReclamation);
router.get('/count', checkAuth , controller.getCount);
router.post('/' ,checkAuth , controller.createReclamation);
router.patch('/:id', checkAuth , controller.editReclamation);
router.delete('/:id', checkAuth , controller.deleteReclamation);
router.delete('/', checkAuth , controller.deleteAllReclamation);

module.exports = router ;