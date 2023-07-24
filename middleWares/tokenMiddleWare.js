module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === "null" || token === null) {
    console.log(token);
    return res.json({ msg: "Not alowed", err: "Acces error" });
  }

  next();
};
