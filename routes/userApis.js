const express = require('express');
const { createUser } = require('../controller/userCtrl');
const { body } = require('express-validator');
const router = express.Router();
const { errorHandler } = require('../middlewares/errorHandler');

//create user
router.post(`/user/register`,[
    body("firstname").not().isEmpty(),
    body("lastname").not().isEmpty(),
    body("email").not().isEmpty().isEmail(),
    body("mobile").not().isEmpty().isNumeric().isLength({min:10}).withMessage('Mobile number must be at least of 10 digits.'),
    body("password").not().isEmpty().isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.')
    ],errorHandler,createUser);

module.exports = router;