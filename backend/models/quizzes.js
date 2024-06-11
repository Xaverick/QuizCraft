const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Question = require('./questions');
const Admin = require('./adminModel');



const quizSchema = new schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    description: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },

    rules: [
        {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        }
    ],

    startTime: {
        type: Date,
        required: true,
    },

    endTime: {
        type: Date,
        required: true,
    },

    duration: {
        type: Number,
        required: true,
    },

    questions: [{
        type: schema.Types.ObjectId,
        ref: 'Question',
    }],

    adminId: {
        type: schema.Types.ObjectId,
        ref: 'Admin',
    },

    totalRegistered: {
        type: Number,
        default: 0,
    }, 
    
    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },

    category: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Quiz', quizSchema);