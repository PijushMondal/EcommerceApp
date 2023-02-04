const express = require('express');
const { createUser , getAllUser , getSingleUser} = require('../controller/userCtrl');
const { body } = require('express-validator');
const router = express.Router();
const { errorHandler } = require('../middlewares/errorHandler');
const { isAuthenticated } = require('../middlewares/authUtils');

//create user
router.post(`/user/register`,[
    body("firstname").not().isEmpty(),
    body("lastname").not().isEmpty(),
    body("email").not().isEmpty().isEmail(),
    body("mobile").not().isEmpty().isNumeric().isLength({min:10}).withMessage('Mobile number must be at least of 10 digits.'),
    body("password").not().isEmpty().isLength({ min: 5 }).withMessage('Password must be at least 5 chars long.')
    ],errorHandler,createUser);

//get all users
router.get(`/get-all-users`,isAuthenticated,getAllUser);

//get a single user
router.get(`/user/:id`,isAuthenticated,getSingleUser);

module.exports = router;