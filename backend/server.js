require("dotenv").config();
const express = require("express");
const mongoDB = require("./db");
const app = express();
const custRoute = require("./routes/customer");
const loginRoute = require("./routes/otpLogin");
const googleRoute = require("./routes/googleLogin");
const getDetailsRoute = require("./routes/getCustDetails");

const vehicleRoute = require("./routes/addVehicle");
mongoDB();

const cors = require("cors");
app.use(cors()); // Enable CORS if necessary

app.use(express.json());
app.use("/api", custRoute);
app.use("/api", googleRoute);
app.use("/api", loginRoute);
app.use("/api", vehicleRoute);
app.use("/api", getDetailsRoute);
app.listen(process.env.PORT, () => {
  console.log("Listening on port 3000");
});
