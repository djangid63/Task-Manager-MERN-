const jwt = require('jsonwebtoken')
const userModel = require('../Models/UserModel');
const secretKey = "abcsdalfhdslf"


module.exports = async (req, res, next) => {
  const barrierToken = req.headers.authorization;
  if (!barrierToken) {
    return res.status(404).json({ message: "No token provided" })
  }

  const token = barrierToken.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "No token found!" })
  }

  const decodeToken = jwt.verify(token, secretKey)
  if (!decodeToken) {
    return res.status(401).json({ message: "invalid token" });
  }

  const user = await userModel.findOne({ email: decodeToken.email })

  req.user = user

  next()
}
