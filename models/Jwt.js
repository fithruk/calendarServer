const { Schema, model } = require("mongoose");

const JWTSchema = new Schema({
  jwt: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("JWT", JWTSchema);
