const mongoose = require('mongoose');
const schema = mongoose.Schema;


const leaderboardSchema = new schema({

    quizId: {
        type: schema.Types.ObjectId,
        ref: 'Quiz',
        required: true,
    },
    
    ranks: [
        {
            userId: {
                type: schema.Types.ObjectId,
                ref: 'User',
            },
            score: {
                type: Number,
                required: true,
            },
            name: {
                type: String,
                required: true,
            }

        },
        
    ],

    date: {
        type: Date,
        default: Date.now
    },

    highestScore: {
        type: Number,
        default: 0,
        // required: true,
    },

    totalUsers: {
        type: Number,
        default: 0,
        // required: true,
    }

})

leaderboardSchema.methods.addUser = function(userId, score, name){
    if(this.ranks.find(r => r.name == name)) return;
    this.ranks.push({userId, score, name});
    this.totalUsers = this.ranks.length;
    this.highestScore = Math.max(this.highestScore, score);
}

module.exports = mongoose.model('Leaderboard', leaderboardSchema);

