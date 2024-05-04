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
            },

            country: {
                type: String,
                required: true,
            },

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

leaderboardSchema.methods.addUser = function(userId, score, name, country) {
    // Check if the userId already exists in the ranks array
    const existingUserIndex = this.ranks.findIndex(rank => String(rank.userId) === String(userId));
    if (existingUserIndex !== -1) {
        // If the userId already exists, update the corresponding entry
        this.ranks[existingUserIndex].score = score;
        this.ranks[existingUserIndex].name = name;
        this.ranks[existingUserIndex].country = country;
    } else {
        // If the userId doesn't exist, add a new entry
        this.ranks.push({ userId, score, name, country });
    }

    // Update totalUsers and highestScore
    this.totalUsers = this.ranks.length;
    this.highestScore = Math.max(this.highestScore, score);
}

module.exports = mongoose.model('Leaderboard', leaderboardSchema);

