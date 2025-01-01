const RewardModel = require("../models/rewardModel");
const uploadOnCloudinary = require("../utils/cloudinary");
const fs = require("fs");

module.exports.createReward = async (req, res) => {
  try {
    const { rewardName } = req.body;
    const rewardImage = req.file;


    if (!rewardName || !rewardImage) {
      return res.status(400).json({
        success: false,
        message: "Reward name and image are required",
      });
    }

    const existingReward = await RewardModel.findOne({
      rewardName: rewardName,
    });

    if (existingReward) {
      return res.status(400).json({
        success: false,
        message: "Reward already exists",
      });
    }

    // Save the file temporarily
    const tempFilePath = rewardImage.path;

    // Upload image to Cloudinary
    const uploadResponse = await uploadOnCloudinary(tempFilePath);

    if (!uploadResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    const newReward = new RewardModel({
      rewardName: rewardName,
      rewardImage: uploadResponse.secure_url,
    });

    await newReward.save();

    res.status(201).json({
      success: true,
      message: "Reward created successfully",
      data: newReward,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while creating reward",
    });
  }
};

module.exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await RewardModel.find();

    if (!rewards) {
      return res.status(404).json({
        success: false,
        message: "No rewards found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All rewards fetched successfully",
      data: rewards,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while getting all rewards",
      error: error.message,
    });
  }
};

module.exports.getRewardDetails = async (req, res) => {
  const { rewardIds } = req.query;
  const rewardIdsArray = rewardIds ? rewardIds.split(",") : [];

  try {
    const rewards = await RewardModel.find({
      _id: { $in: rewardIdsArray },
    });

    if (!rewards) {
      return res.status(404).json({
        success: false,
        message: "No rewards found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Reward details fetched successfully",
      data: rewards,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while getting reward details",
      error: error.message,
    });
  }
};
