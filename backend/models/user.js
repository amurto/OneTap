const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 6 },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    district: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now
      },
    verticals: { type: Array }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);