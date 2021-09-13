const usersR = require("./users");
const birthDayR = require("./birthdays");

exports.routesInit = (app) => {

  app.use("/users",usersR)
  app.use("/birthday",birthDayR)
}