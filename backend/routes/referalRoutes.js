const router = require("express").Router();
const User = require("../models/userModel");

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    _id: id,
  });

  if (!user) {
    res.status(200).json({
      msg: "user not found",
    });
  }

  let coin = parseInt(user.coin);
  coin = coin + 50;

  const sameUser = await User.findOneAndUpdate(
    {
      _id: id,
    },
    {
      coin: coin.toString(),
    }
  );

  if (!sameUser) {
    res.status(200).json({
      msg: "user not found",
    });
  }

  res.status(200).json({
    msg: "referral added",
  });
});

module.exports = router;
