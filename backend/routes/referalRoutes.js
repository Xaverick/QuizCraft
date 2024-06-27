const router = require("express").Router();
const User = require("../models/userModel");

router.route("/signup").get(async (req, res) => {
  // const username = req.query.username;
  // User.findOne({
  //       username: username,
  //     }).then((user)=>{
        
  //     })
  // res.send(user);


  
  // const id = req.params.id;
  // if (id.length != 24) {
  //   res.status(411).send("wrong URL");
  // } else {
  //   const user = await User.findOne({
  //     _id: id,
  //   });
  //   if (!user) {
  //     res.status(200).json({
  //       msg: "user not found: wrong credential",
  //     });
  //   } else {
  //     let coin = parseInt(user.coin);
  //     coin = coin + 50;

  //     const sameUser = await User.findOneAndUpdate(
  //       {
  //         _id: id,
  //       },
  //       {
  //         coin: coin.toString(),
  //       }
  //     );

  //     if (!sameUser) {
  //       res.status(200).json({
  //         msg: "user not found: no coins added",
  //       });
  //     }

  //     res.status(200).json({
  //       msg: "referral added",
  //     });
  //   }
  // }
});

module.exports = router;
