const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userDetail = require('./userModel');

const profileSchema = new schema ({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    // username: {
    //     type: String,
    //     // required: true,
    //     unique: true,
    //     min: 6,
    // },

    bio: {
        type: String,
        max: 1024,
    },
    occupation: {
        type: String,
        max: 255,
    },
    phoneNumber: {
        type: String,
        max: 15,
    },
    dateOfBirth: {
        type: Date,
    },
    country: {
        type: String,
    },

    //Assumption : that the photo will be url() string.

    profilePhoto: {
        type: String, 
    },
    rating:{
        type:Number,
        default:0,
        // required:true,
    },
})




module.exports = mongoose.model('Profile', profileSchema);