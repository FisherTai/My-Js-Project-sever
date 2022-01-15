const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const authRoute = require("./routes").authRouter;
const courseRoute = require("./routes").courseRouter;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

//Connect MongoDB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongo Altas");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/user", authRoute);
app.use(
  "/api/course",
  passport.authenticate("jwt", { session: false }),
  courseRoute
); //驗證用戶

app.listen(8080, () => {
  console.log("Sever Running on Port 8080.");
});
