const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  date: { type: Date, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Task", taskSchema);
