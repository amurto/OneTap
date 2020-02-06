const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 

const HttpError = require('../models/http-error');
const Saturday = require('../models/saturday');
const getCoordsForAddress = require('../util/location');
const School = require('../models/school');
const User = require('../models/user');
const Facilitator = require('../models/facilitator');

const createFac = async (req, res, next) => {
    const { userId, schoolId } = req.body;
    let user;
    let school;
    console.log(userId)
    console.log(schoolId)
    try {
        user = await User.findById(userId);
        school = await School.findById(schoolId);
    } catch (err) {
        const error = new HttpError(
            'Fetching failed.',
            500
          );
          return next(error);
    }

    let skills = [];
    for (let i=0; i<user.verticals.length; i++) {
        skills.push(user.verticals[i][0])
    }

    const createdFacilitator = new Facilitator({
        name: user.name,
        email: user.email,
        phone: user.phone,
        age: user.age,
        skills: skills,
        address: user.address,
        gender: user.gender,
        location: user.location,
        district: user.district,
        state: user.state,
        country: user.country,
        school: schoolId
      });
      
      console.log(createdFacilitator)

      try {
        await createdFacilitator.save();
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again.',
          500
        );
        return next(error);
      }

      let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: 'fourofus.tsec@gmail.com', 
            pass: '1234!@#$asdf'
        } 
        }); 
        let mailDetails = { 
            from: 'fourofus.tsec@gmail.com', 
            to: user.email, 
            subject: 'Apprentice Project', 
            html: 'Respected Human,<br> We have conducted the phone interview and hereby decided to recruit you as a facilitator for our program.<br>Regards,OneTap Team'
        }; 
            
        mailTransporter.sendMail(mailDetails, function(err, data) { 
            if(err) { 
                console.log('Error Occurs'); 
            } else { 
                console.log('Email sent successfully'); 
            } 
        }); 
        let myquery = { _id: userId };
        User.deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("User deleted");
        });

    res.json({ "success": true })
}

const getFacs = async (req, res, next) => {
    let facs;
    try {
        facs = await Facilitator.find({});
        console.log(facs);
    } catch (err) {
        const error = new HttpError(
            'Fetching failed.',
            500
        );
        return next(error);
    }
    res.json({facs: facs.map(fac => fac.toObject({ getters: true }))});
}

exports.createFac = createFac;
exports.getFacs = getFacs;