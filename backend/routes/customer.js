const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
router.post(
  "/createCustomer",
  [
    body("Name")
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 characters")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Name should contain only letters"),

   

    body("Email").isEmail().withMessage("Invalid email format"),

    
    body("Password")
      .isStrongPassword()
      .withMessage(
        "Password must be strong (uppercase, lowercase, number, symbol)"
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.Password, salt);
      await Customer.create({
        Name: req.body.Name,
       
        Email: req.body.Email,
       
        Password: hashedPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
