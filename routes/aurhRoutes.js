const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = require("../models/Jwt");
const { Router } = require("express");
const keys = require("../keys/index");
const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: true });
});

router.post("/registration", async (req, res) => {
  const { email, name, password, confirm } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    return res.json({ msg: "Error" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName: name,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(200).json({
    type: "Succes",
    msg: "Your accaunt has been succesfully created, please login",
  });
});

router.post("/login", async (req, res) => {
  const { lemail: email, lpassword: password } = req.body;

  const candidate = await User.findOne({ email });

  if (!candidate) {
    return res.status(400).json({ error: "User does not exist" });
  }
  const isSame = await bcrypt.compare(password, candidate.password);

  if (isSame) {
    const JWTtoken = jwt.sign(
      { name: candidate.name, id: candidate._id },
      keys.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    const token = new JWT({
      userId: candidate._id,
      jwt: JWTtoken,
    });
    await token.save();

    return res
      .header("Authorization", "Bearer " + JWTtoken)
      .json({ candidate: JWTtoken });
  }
});

router.get("/logout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.decode(token).id;
  await JWT.findOneAndDelete({ userId });

  return res.json({ type: "Succes", msg: "You have successfully logged out" });
});

module.exports = router;
