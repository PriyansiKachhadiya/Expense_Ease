const express = require("express");
const router = express.Router();
const expenseController = require("../Controllers/expenseController.cjs")
const validateExpense = require("../Utils/validations.cjs");

// Routes
router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.post("/", validateExpense, expenseController.createExpense);
router.put("/:id", validateExpense, expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
