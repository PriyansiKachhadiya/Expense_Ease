const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  paymentMethod: { 
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'], // Add valid payment methods here
    required: true 
  },
  notes: { type: String },
  icon: { type: String },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;

