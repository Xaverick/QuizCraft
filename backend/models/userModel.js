const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Quiz = require('./quizzes');
const profile = require('./profileModel')

const userSchema = new schema({

    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    username: {
        type: String,
        // required: true,
        // have removed from unique to just show up the names temporarily
        //unique: true,
        min: 6,

    },
    googleId: {
        type: String,
    },
    picture:{
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255,

    },

    password: {
        type: String,
        min: 6,
        max: 1024,
    },

    subscriptionTier: {
        type: String,
        default: "free",
        enum: ["free", "bronze"],
    },

    registeredQuizzes: [{
        type: schema.Types.ObjectId,
        ref: 'Quiz',
    }],

    country: {
        type: String,
    },


    // referralCodeUrl: {
    //   type: String,
    // },
    referralCodeString:{
        type:String,
    },
    totalUsersReferred:{
        type:Number,
        default:0
    },
    coin: {
      type: Number,
      default:0
    },
  
    profile : {
        type : schema.Types.ObjectId,
        ref:'Profile',
    }

});


module.exports = mongoose.model('User', userSchema);
