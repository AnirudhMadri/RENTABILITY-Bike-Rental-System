require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoDB = require("./db");
const app = express();
const custRoute = require("./routes/customer");
const loginRoute = require("./routes/custLogin");
mongoDB();

app.use(cors());
app.use(express.json());
app.use("/api", custRoute);
app.use("/api", loginRoute);
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
