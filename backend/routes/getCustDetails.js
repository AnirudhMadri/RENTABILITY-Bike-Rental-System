const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.post("/getDetails", async (req, res) => {
  const { Name, Email} = req.body;
  try {
    const customer = await Customer.findOne({ Name, Email});
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
