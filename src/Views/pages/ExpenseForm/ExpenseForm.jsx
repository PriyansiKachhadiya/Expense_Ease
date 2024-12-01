import './ExpenseForm.css';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ExpenseForm() {
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    description: '',
    paymentMethod: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense Submitted", expense);
    fetch("http://localhost:3000/expenses",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify(expense),
    })
    .then((res)=>{if (!res.ok) {
      throw new Error('Failed to add expense');
    }
    return res.json();})
    .then((data)=>{
      console.log('Expense added:', data);
      // After the expense is successfully added, navigate to the dashboard page
      navigate('/dashboard');  // Adjust the path as per your app's routing
    })
    .catch((err) => console.error('Error adding expense:', err));

  };

  return (
    <div className="formdiv">
      <form onSubmit={handleSubmit} className="expense-form">
        <h3 className="formElement">Add a New Expense</h3>
        
        {/* Date Field */}
        <FormControl className="formElement" fullWidth>
          <TextField
            required
            label="Date"
            type="date"
            name="date"
            onChange={handleChange}
            value={expense.date}
            InputLabelProps={{
              shrink: true, // Keeps label above for consistency
            }}
          />
        </FormControl>

        {/* Amount Field */}
        <FormControl className="formElement" fullWidth>
          <TextField
            required
            label="Amount ($)"
            type="number"
            name="amount"
            placeholder="0.00"
            onChange={handleChange}
            value={expense.amount}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        {/* Category Selection */}
        <FormControl className="formElement" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={expense.category}
            onChange={handleChange}
            name="category"
            label="category"
            required
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Food & Dining">Food & Dining</MenuItem>
            <MenuItem value="Transportation">Transportation</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
          </Select>
        </FormControl>

        {/* Description Field */}
        <FormControl className="formElement" fullWidth>
          <TextField
            label="Description"
            placeholder="Brief description"
            name="description"
            value={expense.description}
            onChange={handleChange}
            multiline
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        {/* Payment Method Selection */}
        <FormControl className="formElement" fullWidth>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={expense.paymentMethod}
            onChange={handleChange}
            name="paymentMethod"
            label="Payment Method"
            required
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
          </Select>
        </FormControl>

        {/* Notes Field */}
        <FormControl className="formElement" fullWidth>
          <TextField
            label="Notes"
            placeholder="Optional notes about this expense"
            name="notes"
            value={expense.notes}
            onChange={handleChange}
            multiline
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <button className="formElement" type="submit">Save Expense</button>
        <button className="formElement" type="reset">Clear Form</button>
      </form>
    </div>
  );
}

export default ExpenseForm;


