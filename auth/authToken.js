const jwt = require("jsonwebtoken");

exports.authToken = (req,res,next) =>{
    // Check if token has been sent.
  let token = req.cookies["x-api-key"];
  if(!token){
    return res.status(401).json({msg:"you must send token"})
  }
  // Check if the token is valid amd not expired
  try{
    let decodeToken = jwt.verify(token,"MONKEYSSECRET");
    req.tokenData = decodeToken;
    next();

  }
  catch(err){
    console.log(err)
    return res.status(401).json({msg:"token invalid or expired 333"})
  }
}