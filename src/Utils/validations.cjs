const { body } = require("express-validator");

module.exports = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .notEmpty()
    .withMessage("Amount is required"),
  body("category")
    .isString()
    .withMessage("Category must be a string")
    .notEmpty()
    .withMessage("Category is required"),
  body("date")
    .isISO8601()
    .withMessage("Date must be in ISO format")
    .notEmpty()
    .withMessage("Date is required"),
  body("description").isString().optional(),
  body("paymentMethod").isString().optional(),
  body("notes").isString().optional(),
  body("icon").isString().optional(),
];
