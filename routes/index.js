const express = require('express');
const passport = require('passport');

const router = express.Router();

//controller for routing
const homeController = require('../controllers/home_controller');

router.get('/', passport.checkAuthentication, homeController.home);

router.use('/users', require('./users'));
module.exports = router;