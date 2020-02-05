const express = require('express');
const { check } = require('express-validator');
const schoolsController = require('../controllers/schools-controllers');

const router = express.Router();

router.get(
    '/', 
    schoolsController.getSaturday
);

router.post(
    '/saturday', 
    schoolsController.postSaturday
);

module.exports = router;