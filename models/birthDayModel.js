const mongoose = require("mongoose");
const Joi = require("joi");
const { date } = require("joi");

const birthDaySchema = new mongoose.Schema({
  fullName:String,
  dateOfBirth:Date,
  img:String,
  userId: String
});


const BirthDayModel = mongoose.model("birthDays",birthDaySchema);
exports.BirthDayModel = BirthDayModel;


exports.validBirthDay = (_bodyData) => {
  let joiSchema = Joi.object({
    fullName:Joi.string().min(2).max(99).required(),
    img:Joi.string().min(2).max(300),
    dateOfBirth:Joi.date().raw().required(),

  })

  return joiSchema.validate(_bodyData);
}