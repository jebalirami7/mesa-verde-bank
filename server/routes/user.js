const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

router.post('/signup', controller.signup); 

router.post('/login', controller.login)

router.get('/current', checkAuth, controller.current)

router.delete('/', controller.deleteAllUsers);

module.exports = router ;