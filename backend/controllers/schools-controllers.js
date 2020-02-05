const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Saturday = require('../models/saturday');

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

exports.getSaturday = getSaturday;
exports.postSaturday = postSaturday;