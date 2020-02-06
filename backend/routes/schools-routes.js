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

router.post(
    '/register',
    schoolsController.registerSchool
)

router.get(
    '/get',
    schoolsController.getSchools
)

module.exports = router;