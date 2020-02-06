const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 

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

    const { name, email, phone, address, age, gender, foi } = req.body;

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
        age,
        address,
        gender,
        location: coordinatesArray[0],
        district: coordinatesArray[1],
        state: coordinatesArray[2],
        country: coordinatesArray[3],
        selected1: false,
        selected2: false
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

const getApplicants = async (req, res, next) => {
    let applicants;
    try {
        applicants = await User.find({});
        console.log(applicants);
    } catch (err) {
        const error = new HttpError(
            'Fetching failed.',
            500
        );
        return next(error);
    }
    res.json({applicants: applicants.map(applicant => applicant.toObject({ getters: true }))});
}

const shortlistApplicant = async (req, res, next) => {
    const { email } = req.body;
    let newvalues = {$set: {selected1: true} };
    
    let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: 'fourofus.tsec@gmail.com', 
            pass: '1234!@#$asdf'
        } 
    }); 
    let mailDetails = { 
        from: 'fourofus.tsec@gmail.com', 
        to: email, 
        subject: 'Apprentice Project Form 2', 
        html: 'Respected Human,<br> Thank you very much for the invitation to interview for the Facilitator position. I appreciate the opportunity, and I look forward to meeting with you on the coming Saturday at 9 AM in your allotted school.<br>If I can provide you with any further information prior to the interview, please let me know.<br>Best Regards,<br>OneTap Management Team'
    }; 
        
    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log('Error Occurs'); 
        } else { 
            console.log('Email sent successfully'); 
        } 
    }); 
    try { 
        User.updateOne({ email: email }, newvalues, function(err, res) {
            if (err) throw err;
            console.log("User Updated");
        });
    } catch (err) {
        const error = new HttpError(
            'Fetching failed.',
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

const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;
    console.log(req.params.uid)
    let user;
    try {
      user = await User.findById(userId)
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not delete applicant.',
        500
      );
      return next(error);
    }
  
    if (!user) {
      const error = new HttpError('Could not find applicant for this id.', 404);
      return next(error);
    }
    
    let myquery = { _id: userId };
    User.deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("User deleted");
    });
    res.status(200).json({ message: 'Deleted applicant.' });
};

exports.deleteUser = deleteUser;
exports.registerForm = registerForm;
exports.registerVerticals = registerVerticals;
exports.getApplicants = getApplicants;
exports.shortlistApplicant = shortlistApplicant;