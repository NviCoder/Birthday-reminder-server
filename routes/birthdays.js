const express = require("express");
const {BirthDayModel , validBirthDay} = require("../models/birthDayModel")
const router = express.Router();
const {authToken} = require('../auth/authToken');

/******************************************************** */
/**This router bring back all the birthdays!! */
router.get("/", authToken, async(req,res) => {
  //Filter the birthday for user that auth.
  let _userId = req.tokenData["_id"];
  let data = await BirthDayModel.find({userId:_userId});
  
  res.json(data);
})

/******************************************************** */
/**This router Insert New friend birthday*/
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

/******************************************************** */
/**This router Delete friend birthday only for this user*/
router.delete("/:idDel" ,authToken,async(req,res) => {
  try{
    let _userId = req.tokenData["_id"];
    console.log("User Id: ",_userId);
    console.log("birthday_id: ",req.params.idDel);
    let data = await BirthDayModel.deleteOne({_id:req.params.idDel, userId:_userId} );
    
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(400).send(err)
  }
})

/******************************************************** */
/**This router Update one friend birthday*/
router.put("/:idEdit",authToken,async(req,res) => {
  let validBody = validBirthDay(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let _userId = req.tokenData["_id"];
    console.log("User Id: ",_userId);
    console.log("birthday_id: ",req.params.idEdit);
    let data = await BirthDayModel.updateOne({_id:req.params.idEdit, userId:_userId},req.body);
    // 1 for sucsses
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(400).send(err)
  }
})

module.exports = router;