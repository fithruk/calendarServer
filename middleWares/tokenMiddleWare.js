module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token === "null")
    return res.json({ msg: "Not alowed", err: "Acces error" });
  next();
};
