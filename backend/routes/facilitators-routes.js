const express = require('express');
const { check } = require('express-validator');
const facilitatorsController = require('../controllers/facilitators-controllers');

const router = express.Router();

router.post(
    '/',
    facilitatorsController.createFac
);

router.get(
    '/facs',
    facilitatorsController.getFacs
)

module.exports = router;