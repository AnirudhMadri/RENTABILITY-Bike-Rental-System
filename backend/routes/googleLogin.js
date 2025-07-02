const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/google-login", async (req, res) => {
  const { name, email } = req.body;

  try {
    console.log(name);
    console.log(email);
    let customer = await Customer.findOne({ email });

    if (!customer) {
      customer = new Customer({ Name: name, Email: email });
      customer.Name = name;
      customer.Email = email;
      await customer.save();
    }
    const token = jwt.sign(
      {
        id: customer._id,
        email: customer.Email,
        name: customer.Name,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // short form of 1 hour
    );
    return res.status(200).json({ customer, token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
