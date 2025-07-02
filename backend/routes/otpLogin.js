const express = require("express");
const router = express.Router();
const Otp = require("../models/Otp");
const Customer = require("../models/Customer");
const twilio = require("twilio");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Helper to generate 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// SEND OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { Phone } = req.body;
    const otpCode = generateOtp();
    const ExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 min

    // Save OTP in DB
    await Otp.create({ Phone, Otp: otpCode, ExpiresAt });
    console.log("OTP saved in DB");

    // Send OTP via SMS using Twilio
    await twilioClient.messages.create({
      body: `Your OTP is ${otpCode}`,
      from: process.env.TWILIO_PHONE_NO,
      to: Phone,
    });

    res.json({ message: "OTP sent via SMS" });
  } catch (error) {
    console.error("Error in /send-otp:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

// VALIDATE OTP
router.post("/validate-otp", async (req, res) => {
  const { Phone, Otp: inputOtp } = req.body;
  try {
    const record = await Otp.findOne({ Phone, Otp: inputOtp });

    if (!record) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (record.ExpiresAt < new Date()) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    let customer = await Customer.findOne({ Phone });

    if (!customer) {
      customer = await Customer.create({ Phone });
      await Otp.deleteMany({ Phone });
      return res.json({ exists: false }); // User needs to register
    }

    const token = jwt.sign(
      {
        id: customer._id,
        Email: customer.Email,
        Name: customer.Name,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    await Otp.deleteMany({ Phone });

    return res.json({
      exists: true,
      message: "OTP verified, login success",
      token,
      customer: {
        id: customer._id,
        Phone: customer.Phone,
        Name: customer.Name || "",
        Email: customer.Email || "",
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// REGISTER USER
router.post("/register-user", async (req, res) => {
  const { Name, Email, Address, Phone } = req.body;

  try {
    const customer = await Customer.findOne({ Phone });

    if (!customer) {
      return res.status(400).json({ error: "Couldn't find customer data." });
    }

    customer.Name = Name;
    customer.Email = Email;
    customer.Address = Address;
    await customer.save();

    const token = jwt.sign(
      {
        id: customer._id,
        Email: customer.Email,
        Name: customer.Name,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Registration successful",
      token,
      customer: {
        id: customer._id,
        Name: customer.Name,
        Email: customer.Email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Couldn't update due to server error." });
  }
});

module.exports = router;
