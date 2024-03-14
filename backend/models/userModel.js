const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    username: {
        type: String,
        required: true,
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

    verified: {
        type: Boolean,
        default: false,
    },

});


module.exports = mongoose.model('User', userSchema);