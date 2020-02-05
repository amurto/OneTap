const mongoose = require('mongoose');

const saturdaySchema = mongoose.Schema({
    college : {
        type : String,
        required :true
    },
    college_rep : {
        type : Number,
        required : true 
    },
    coding_mem : {
        type : Array,
        required : false
    },
    coding_num : {
        type : Array,
        required : false
    },
    dance_mem : {
        type : Array,
        required : false
    },
    dance_num : {
        type : Array,
        required : false
    },
    drama_mem : {
        type : Array,
        required : false
    },
    drama_num : {
        type : Array,
        required : false
    }
});

module.exports = mongoose.model('Saturday', saturdaySchema);