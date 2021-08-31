const express = require("express");
const {BirthDayModel , validBirthDay} = require("../models/birthDayModel")
const router = express.Router();
const {authToken} = require('../auth/authToken');

/**This router bring back the birthdays that Today!! */
router.get("/", authToken, async(req,res) => {
  //Filter the birthday for user that loged in.
  let _userId = req.tokenData["_id"];
  //let data = await BirthDayModel.find({userId:_userId , dateOfBirth: new Date().toJSON().substring(0,10)});
  let data = await BirthDayModel.find({userId:_userId});
  
  res.json(data);
})

router.post("/", authToken, async(req,res) => {
  let validBody = validBirthDay(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  req.body.userId = req.tokenData["_id"];
  let birthday = new BirthDayModel(req.body);
  await birthday.save();
  res.json(birthday);
})


router.delete("/:idDel" ,async(req,res) => {
  try{
    let data = await BirthDayModel.deleteOne({_id:req.params.idDel});
    
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(400).send(err)
  }
})

//edit
router.put("/:idEdit" ,async(req,res) => {
  let validBody = validBirthDay(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let data = await BirthDayModel.updateOne({_id:req.params.idEdit},req.body);
    // אם יש הצלחה נקבל מאפיין של אן שווה 1
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(400).send(err)
  }
})

module.exports = router;