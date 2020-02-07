const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    date : {
        type : String,
        required :true
    },
    coding : {
        type : Number,
        required : true 
    },
    dance : {
        type : Number,
        required : true
    },
    drama : {
        type : Number,
        required : true
    },
    users : {
        type : Array,
        required : false
    }
});

module.exports = mongoose.model('attendance' , attendanceSchema);