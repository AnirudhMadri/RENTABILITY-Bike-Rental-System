// models/Otp.js
const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI =
  "mongodb+srv://anirudhsm2:5YGYOTg2N0SvbI2B@cluster0.zb1kxyo.mongodb.net/";

// Connect to MongoDB
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

const OtpDB = mongoose.connection.useDb("OtpDB");

const { Schema } = mongoose;
const otpSchema = new Schema({
  Phone: {
    type: String,
    required: true,
  },
  Otp: {
    type: String,
    required: true,
  },
  ExpiresAt: {
    type: Date,
    required: true,
  },
});

const otpModel = OtpDB.model("Otp", otpSchema);

module.exports = otpModel;
