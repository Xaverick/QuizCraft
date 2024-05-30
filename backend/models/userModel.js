const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Quiz = require('./quizzes');

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
        unique: true,
        min: 6,

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
        required: true,
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
    }

});


module.exports = mongoose.model('User', userSchema);