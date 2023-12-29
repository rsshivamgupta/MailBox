require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./database");

const userRoute = require("./Routes/user");
const mailRoute = require("./Routes/mail");

const User = require("./Models/User");
const Mail = require("./Models/Mail");

app = express();

app.use(cors());
app.use(bodyParser.json({ extends: false }));

app.use("/user", userRoute);
app.use("/mail", mailRoute);

User.hasMany(Mail);
Mail.belongsTo(User);
db.sync({alter:true})
  .then(() => {
    console.log("Listening to the port ....");
    app.listen(process.env.APP_PORT);
  })
  .catch((err) => console.log(err));
