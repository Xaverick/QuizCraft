const Profile = require("../models/profileModel");
const user = require("../models/userModel");


module.exports.getLeaderboardResults = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .sort({ rating: -1 }) // Sort profiles by rating in descending order
      .populate("userId", "username country registeredQuizzes picture")
      .lean();
// Convert Mongoose documents to plain JavaScript objects

    if (!profiles.length) {
      return res.status(404).json({ message: "No leaderboard data found" });
    }
    console.log(profiles);

    const leaderboardData = profiles.filter((profile) => profile.userId != null).map((profile, index) => ({
      rank: index + 1,
      username: profile.userId ? profile.userId.username : "Unknown", // Handle null case
      country: profile.userId ? profile.userId.country : "Unknown", // Handle null case
      totalQuiz: profile.userId?.registeredQuizzes?.length,
      rating: profile.rating, 
      picture: profile.userId?.picture    
      
  }));



    // console.log(leaderboardData)

    res.json(leaderboardData);
  } catch (err) {
    console.error("Error fetching leaderboard data:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};




