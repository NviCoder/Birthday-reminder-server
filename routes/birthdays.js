const express = require("express");
const {BirthDayModel , validBirthDay} = require("../models/birthDayModel")
const router = express.Router();

router.get("/", async(req,res) => {
  let data = await BirthDayModel.find({});
  // res.header("Access-Control-Allow-Origin", "*");
  res.json(data);
})

router.post("/", async(req,res) => {
  let validBody = validBirthDay(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  let birthday = new BirthDayModel(req.body);
  await birthday.save();
  // res.header("Access-Control-Allow-Origin", "*");
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