const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    address : {
        type : String,
        required : true 
    },
    feedback : {
        type : String,
        required : false
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    }
});

module.exports = mongoose.model('schools' , schoolSchema);