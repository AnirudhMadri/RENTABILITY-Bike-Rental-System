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
const bookingDB = mongoose.connection.useDb("BookingDB");

// Define the Customer schema
const { Schema } = mongoose;

const bookingSchema = new Schema({
  StartDateTime: {
    type: Date,
    required: true,
  },
  EndDateTime: {
    type: Date,
    required: true,
  },
  UserId: {
    type: Number,
    required: true,
  },
  VehicleId: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    enum: ["confirmed", "pending", "cancelled"],
    default: "pending",
    
  },
});

module.exports = bookingDB.model("Booking", bookingSchema);
