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
const customerDB = mongoose.connection.useDb("CustomerDB");

// Define the Customer schema
const { Schema } = mongoose;

const custSchema = new Schema({
  Name: {
    type: String,
    default: null,
  },

  Email: {
    type: String,
    default: null,
  },

  Phone: {
    type: String,
    default: null,
  },
  Address: {
    type: String,
    default: null,
  },
});

// Define the Customer model with the correct database
const custModel = customerDB.model("Customer", custSchema);

module.exports = custModel;
