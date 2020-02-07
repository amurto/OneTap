const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    coding : {
        type : String,
        required :true
    },
    dance : {
        type : String,
        required : true 
    },
    drama : {
        type : String,
        required :true
    },
    speaking : {
        type : String,
        required : true 
    },
    music : {
        type : String,
        required :true
    },
    elex : {
        type : String,
        required : true 
    },
    arts : {
        type : String,
        required :true
    },
    frisbee : {
        type : String,
        required : true 
    },
    manager : {
        type : String,
        required :true
    },
    college : {
        type : String,
        required :true
    }
});

module.exports = mongoose.model('feedback' , feedbackSchema);