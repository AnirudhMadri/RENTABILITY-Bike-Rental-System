const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://anirudhsm2:5YGYOTg2N0SvbI2B@cluster0.zb1kxyo.mongodb.net/';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to Database!");
    
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = mongoDB;
