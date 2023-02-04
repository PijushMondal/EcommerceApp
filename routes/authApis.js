const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {loginWithEmailPassword} = require('../controller/authCtrl');
const {errorHandler} = require('../middlewares/errorHandler');

//login route
router.post('/user/login-with-email-password',[
    body("email").not().isEmpty().isEmail(),
    body("password").not().isEmpty()
],errorHandler,loginWithEmailPassword);

module.exports = router;