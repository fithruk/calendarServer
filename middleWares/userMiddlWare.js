const jsw = require("jsonwebtoken");
const JWT = require("../models/Jwt");
const keys = require("../keys/index");

module.exports = async function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const userId = jsw.verify(token, keys.JWT_SECRET_KEY).id;
    req.userId = userId;
    next();
  } catch (error) {
    const userId = jsw.decode(token).id;
    await JWT.findOneAndDelete({ userId });
    return res.json({ msg: `${error.message}`, err: "Acces error" });
  }
};
