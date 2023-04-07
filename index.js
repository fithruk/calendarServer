const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;
const tokenMiddleWare = require("./middleWares/tokenMiddleWare");
const cookieParser = require("cookie-parser");
const keys = require("./keys/index");

const authRouter = require("./routes/aurhRoutes");
const eventsRouter = require("./routes/eventsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: keys.CLIENT_URL,
    credentials: true,

    methods: ["GET", "POST", "DELETE"],
  })
);

app.use("/auth", authRouter);
app.use("/calendar", tokenMiddleWare, eventsRouter);

const start = async () => {
  try {
    await mongoose.connect(keys.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = app;
