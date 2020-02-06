const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Saturday = require('../models/saturday');
const getCoordsForAddress = require('../util/location');
const School = require('../models/school');

const getSaturday = async(req, res, next) => {
    let saturdays;
    try {
        saturdays = await Saturday.find({})
        console.log(saturdays)
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ok: "ok"});
}

const postSaturday = async(req, res, next) => {
    const createdSaturday = new Saturday({
        college:"fr.crce",
        college_rep:"+918879215181",
        coding_mem:["carol","sherwin"],
        coding_num:["+918879215181","123456789"],
        dance_mem:["amurto","bhate"],
        dance_num:["4557857596","5687089687"]
      });

      console.log(createdSaturday);

      try {
        await createdSaturday.save();
      } catch (err) {
        const error = new HttpError(
          'Signing up failed, please try again.',
          500
        );
        return next(error);
      }
        res.json({ 
            ok: "ok"
        });
}

const registerSchool = async (req, res, next) => {
    let coords;
    coords = await getCoordsForAddress(req.body.address)
    console.log(coords)
    const school = new School({
            name : req.body.name,
            address : req.body.address,
            location : coords[0]
    });
    
    console.log(school);
    
    try {
        await school.save();
    } catch (err) {
      const error = new HttpError(
          'Signing up failed, please try again.',
              500
            );
            return next(error);
      }
    res.send(school);
}

const getSchools = async (req, res, next) => {
  let schools;
  try {
    schools = await School.find({});
    console.log(schools);
  } catch (err) {
    const error = new HttpError(
      'Fetching failed.',
      500
    );
    return next(error);
  }
  res.json({schools: schools.map(school => school.toObject({ getters: true }))});
}

exports.getSaturday = getSaturday;
exports.postSaturday = postSaturday;
exports.registerSchool = registerSchool;
exports.getSchools = getSchools;