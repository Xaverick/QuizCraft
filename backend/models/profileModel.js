const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userDetail = require('./userModel');

const profileSchema = new schema ({

    userId: {
        type: schema.Types.ObjectId,    
        ref: 'User',
        required: true,

    },

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

    profilePhoto: {
        type: String, 
    },

    rating:{
        type:Number,
        default:0,
        // required:true,    
    },

    referralCodeString:{
        type:String,
        Unique:true,
    },

    totalUsersReferred:{
        type:Number,
        default:0
    },
    
    coin: {
      type: Number,
      default:0
    },
    
    platformLinks: [
    ],
    professions: [],
})




module.exports = mongoose.model('Profile', profileSchema);