const express = require("express");
const router = express.Router();
const custModel = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    const customer = await custModel.findOne({ Email });

    if (!customer) {
      return res.status(401).json({ error: "This user is not found" });
    }

    const isMatch = await bcrypt.compare(Password, customer.Password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: customer._id,
        email: customer.Email,
        name: customer.Name,
      },
      JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        id: customer._id,
        name: customer.Name,
        email: customer.Email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
