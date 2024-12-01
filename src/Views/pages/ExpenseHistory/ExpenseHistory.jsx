import { useEffect, useState } from 'react';
import './ExpenseHistory.css';
import { Card, CardContent,Select,MenuItem, CardActions, Button, Typography, TextField, Grid ,FormControl,InputLabel} from '@mui/material';

function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: '', dateRange: '' });
  const [editingExpense, setEditingExpense] = useState(null); // Track the expense being edited
  const [updatedExpense, setUpdatedExpense] = useState({}); // Holds the updated expense details

  useEffect(() => {
    fetch("http://localhost:3000/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error("Error fetching expenses:", error));
  }, []);

  // Handle the change of form fields during editing
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExpense({ ...updatedExpense, [name]: value });
  };

  // Handle click on Edit button
  const handleEditClick = (expense) => {
    setEditingExpense(expense); // Set the expense to be edited
    setUpdatedExpense(expense); // Set the initial data for the form
  };

  // Handle Save button click to update expense
  const handleSaveEdit = () => {
    fetch(`http://localhost:3000/expenses/${editingExpense._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExpense),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense._id === updatedData._id ? updatedData : expense
          )
        );
        setEditingExpense(null); // Clear the editing state after save
      })
      .catch((error) => console.error('Error updating expense:', error));
  };

  // Handle Cancel button click
  const handleCancelEdit = () => {
    setEditingExpense(null); // Cancel editing and reset to normal view
  };

  // Handle Delete button click
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/expenses/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
        }
      })
      .catch((error) => console.error('Error deleting expense:', error));
  };

  // Handle Filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter expenses based on selected filters
  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory = filters.category
      ? expense.category.toLowerCase().includes(filters.category.toLowerCase())
      : true;
    const matchDateRange = filters.dateRange ? expense.date.includes(filters.dateRange) : true;
    return matchCategory && matchDateRange;
  });

  // Calculate total expense amount
  const totalAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="expense-history">
      <h3>Expense History</h3>

      {/* Filters */}
      <div className="filters">
        <TextField
          id="category-filter"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          label="Filter by category"
          variant="outlined"
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          id="date-range-filter"
          name="dateRange"
          value={filters.dateRange}
          onChange={handleFilterChange}
          label="Filter by date range"
          variant="outlined"
        />
      </div>

      {/* Display filtered expenses */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {filteredExpenses.map((expense) => (
          <Grid item xs={12} sm={6} md={4} key={expense._id}>
            <Card variant="outlined">
              {editingExpense && editingExpense._id === expense._id ? (
                // Editable form for the specific expense
                <div className='editform-card'>


                  <FormControl className="formElement" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={updatedExpense.category}
                      onChange={handleFormChange}
                      name="category"
                      label="category"

                      style={{ marginBottom: '1rem' }}
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

                  <TextField

                    label="Amount ($)"
                    type="number"
                    name="amount"
                    variant="outlined"
                    placeholder="0.00"
                    onChange={handleFormChange}
                    value={updatedExpense.amount}
                    style={{ marginBottom: '1rem' }}


                  />
                  {/* Payment Method Selection */}
                  <FormControl className="formElement" fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      value={updatedExpense.paymentMethod}
                      onChange={handleFormChange}
                      name="paymentMethod"
                      label="Payment Method"
                      style={{ marginBottom: '1rem' }}

                    >
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Debit Card">Debit Card</MenuItem>
                    </Select>
                  </FormControl>


                  {/* Description Field */}
                  <FormControl className="formElement" fullWidth>
                    <TextField
                      label="Description"
                      placeholder="Brief description"
                      name="description"
                      value={updatedExpense.description}
                      onChange={handleFormChange}
                      style={{ marginBottom: '1rem' }}
                      multiline
                      InputLabelProps={{
                        shrink: true,
                      }
                     
                    }
                    />
                  </FormControl>
                
                  <Button onClick={handleSaveEdit} variant="contained" color="primary">
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                    Cancel
                  </Button>
                </div>
              ) : (
                // Normal view of the expense
                <>
                  <CardContent>
                    <Typography variant="h6">{expense.category}</Typography>
                    <Typography color="textSecondary">{expense.date}</Typography>
                    <Typography variant="body2">Amount: ${expense.amount}</Typography>
                    <Typography variant="body2">Payment: {expense.paymentMethod}</Typography>
                    <Typography variant="body2">Description: {expense.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleEditClick(expense)}>
                      Edit
                    </Button>
                    <Button size="small" color="secondary" onClick={() => handleDelete(expense._id)}>
                      Delete
                    </Button>
                  </CardActions>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Summary */}
      <div className="summary">
        <h2>Total Expenses: ${totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default ExpenseHistory;



