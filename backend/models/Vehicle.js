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

// Switch to specific database if needed (optional)
const vehicleDB = mongoose.connection.useDb("VehicleDB");

// Define the Customer schema
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  Type: {
    type: String,
    required: true,
  },

  Brand: {
    type: String,
    required: true,
  },

  Model: {
    type: String,
    required: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  Price_Per_Hour: {
    type: Number,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },

  OwnerId: {
    type: String,
    required: true,
  },
  Availability: {
    type: Boolean,
    required: true,
  },
  Photos: {
    type: [String], // URL to the uploaded image
    required: false,
  },
});

// Define the Customer model with the correct database
const vehicleModel = vehicleDB.model("Vehicle", vehicleSchema);

module.exports = vehicleModel;
