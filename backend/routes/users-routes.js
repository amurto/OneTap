const express = require('express');
const { check } = require('express-validator');
const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.post(
    '/register', 
    [
        check('name')
          .not()
          .isEmpty(),
        check('email')
          .normalizeEmail() // Test@test.com => test@test.com
          .isEmail(),
        check('address')
          .not()
          .isEmpty(),
        check('phone')
          .not()
          .isEmpty()
    ],
    usersController.registerForm
);


module.exports = router;