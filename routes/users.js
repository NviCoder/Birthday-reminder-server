const express = require("express");
const bcrypt = require("bcrypt")
const { UserModel, validUser, validLogin, genToken } = require("../models/userModel")
const router = express.Router();
const {authToken} = require('../auth/authToken');

router.get("/", (req, res) => {
  res.json({ msg: "users work" });
})

router.get("/userInfo",authToken, async(req,res) => {
  res.json({ msg: "User Info" });
  let user = await UserModel.findOne({_id:req.tokenData._id},{pass:0});
  
})

router.post("/", async (req, res) => {
  //req.body
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    //TODO: להצפין את הסיסמא
    user.pass = await bcrypt.hash(user.pass, 10);
    await user.save();
    user.pass = "*****";
    res.json(user);
  }
  catch (err) {
    console.log(err);
    res.status(400).json({err:"Email already in system or there anothe problem"})
  }
})


router.post("/login" , async(req,res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  // נבדוק אם המייל שנשלח בבאדי קיים במסד נתונים
  let user  = await UserModel.findOne({email:req.body.email});
  if(!user){
    return res.status(401).json({msg:"User not found"});
  }
  // נבדוק אם הסיסמא שנשלחה מתאימה להצפנה שנמצאת במסד
  let passValid = await bcrypt.compare(req.body.pass,user.pass);
  if(!passValid){
    return res.status(401).json({msg:"Password worng"});
  }

  // נחזיר הודעה שהכל בסדר ונייצר טוקן
  let newToken = genToken(user._id);

  res.cookie("x-api-key",newToken,{
    maxAge: 60*60*24*30*1000,
  });
  res.json({msg:"Wellcom back!"});
})

module.exports = router;