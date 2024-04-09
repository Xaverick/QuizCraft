const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Quiz = require('./quizzes');
const User = require('./userModel');


const submissionSchema = new schema({

    userId: {
        type: schema.Types.ObjectId,
        ref: 'User',
    },

    quizId: {
        type: schema.Types.ObjectId,
        ref: 'Quiz',
    },

    answers: [{
        questionId: {
            type: schema.Types.ObjectId,
            unique: true,
            ref: 'Question',
        },
        response: {
            type: String,
        },

        correct: {
            type: Boolean,
            default: false,
        }
    }],

    correctAnswers: {
        type: Number,
        default: 0,
    },

    totalQuestions: {
        type: Number,
        default: 0,
    },

    score: {
        type: Number,
        default: -1,        // -1 to show the score is not yet calculated
    },

    submittedAt: {
        type: Date,
        default: Date.now,
    },

});


module.exports = mongoose.model('Submission', submissionSchema);
