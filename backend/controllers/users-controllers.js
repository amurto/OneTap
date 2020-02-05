const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const User = require('../models/user');

const registerForm = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    let users;

    const { name, email, phone, address, foi } = req.body;

    let existingUser
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
        'Signing up failed, please try again later.',
        500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
          'User exists already, please login instead.',
          422
        );
        return next(error);
    }

    let coordinatesArray;
    try {
        coordinatesArray = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    if (coordinatesArray[3] !== 'India') {
        const error = new HttpError(
        'Please enter an address in India',
        422
        );
        return next(error);
    }

    if (coordinatesArray[1] == undefined || coordinatesArray[2] == undefined) {
        const error = new HttpError(
        'Could not get district and state from address. Please enter full address.',
        422
        );
        return next(error);
    }
    let m = coordinatesArray[1].toLowerCase().includes("mumbai")
    let p = coordinatesArray[1].toLowerCase().includes("pune")
    console.log(m, p)
    if (m === false && p === false) {
        const error = new HttpError(
            'City has to be Mumbai or Pune',
            422
        );
        console.log("Wrong City");
        return next(error);
    }
    
    var isnum = /^\d+$/.test(phone);

    if (phone.length !== 10 || isnum == false) {
        const error = new HttpError(
        'Please enter a valid mobile number',
        422
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        phone,
        address,
        location: coordinatesArray[0],
        district: coordinatesArray[1],
        state: coordinatesArray[2],
        country: coordinatesArray[3]
      });
      
      console.log(createdUser)

      try {
        await createdUser.save();
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again.',
          500
        );
        return next(error);
      }

    res
        .status(201)
        .json({ 
            userId: createdUser.id 
        });
};

const registerVerticals = async (req, res, next) => {
    const { verticals, uid } = req.body;
    console.log(verticals)
    let newvalues = {$set: {verticals: verticals} };

    try {
        User.updateOne({ _id: uid }, newvalues, function(err, res) {
            if (err) throw err;
            console.log("User Updated");
        });
    } catch (err) {
        const error = new HttpError(
            'Update failed, please try again.',
            500
        );
        return next(error);
    }
    res
        .status(201)
        .json({ 
            "success": true 
        });
}

exports.registerForm = registerForm;
exports.registerVerticals = registerVerticals;