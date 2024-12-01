const Expense = require("../Models/expense.cjs")
const { validationResult } = require("express-validator");

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await Expense.find({});
    res.status(200).json(allExpenses);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get a single expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newExpense = await Expense.create(req.body);
    const success = "New listing created!";
    req.flash("success",success)
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Failed to create expense", err });
  }
};

// Update an expense by ID
exports.updateExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: "Failed to update expense", err });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(deletedExpense);
  } catch (err) {
    res.status(500).send(err);
  }
};
