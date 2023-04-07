const Task = require("../models/Task");
const userMiddleWare = require("../middleWares/userMiddlWare");
const { Router } = require("express");
const router = Router();

router.get("/", userMiddleWare, async (req, res) => {
  try {
    const userTasks = await Task.find({ userId: req.userId }).exec();
    res.json({
      events: userTasks.map((task) => ({
        ...task._doc,
        id: task._id.toString(),
      })),
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/addEvent", userMiddleWare, async (req, res) => {
  const { date, dateFrom, dateTo, description, title } = req.body;
  const newEvent = new Task({
    date,
    dateFrom,
    dateTo,
    description,
    title,
    userId: req.userId,
  });
  await newEvent.save();
  res.status(200).json({
    type: "Succes",
    msg: "New event has been created succesfully",
  });
});

router.delete("/deleteEvent/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({
    type: "Succes",
    msg: "Event has been removed succesfully",
  });
});

module.exports = router;
