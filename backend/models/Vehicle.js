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

// Define the schema
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  Type: { type: String, required: true },
  Brand: { type: String, required: true },
  Model: { type: String, required: true },
  Year: { type: Number, required: true },
  Price_Per_Hour: { type: Number, required: true },
  Location: { type: String, required: true },
  OwnerId: { type: String, required: true },
  Availability: { type: Boolean, required: true },
  Trips: { type: Number, default: 0 }, // optional by default
  Photos: { type: [String] }, // optional by default

  // Admin/User optional fields
  Ratings: { type: Number, default: 0, required: false },
  DropLocation: { type: String, required: false, default: "Thane" },
  KilometerLimit: { type: Number, required: false, default: 150 },
  SecurityDeposit: { type: Number, required: false, default: 2000 },

  BikesAvailable: { type: Number, required: false },

  // Required fields
  FuelType: { type: String, required: true },
  FuelCapacity: { type: Number, required: true },
  Weight: { type: Number, required: true },
  Mileage: { type: Number, required: true },
  Displacement: { type: Number, required: true },
  TopSpeed: { type: Number, required: true },
  Seats: { type: Number, required: true },
});

// Define model
const vehicleModel = vehicleDB.model("Vehicle", vehicleSchema);

module.exports = vehicleModel;
