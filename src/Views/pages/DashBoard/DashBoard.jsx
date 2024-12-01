import CategoryChart from './CategoryChart';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import SummaryCardMenu from './SummaryCardMenu';
import RecentExpensesMenu from './RecentExpensesMenu';


function Dashboard() {
  const [expenses, setExpenses] = useState([])

  const [summaryData, setSummaryData] = useState([
    { title: "Total Expenses", value: "$0", icon: "💵", idx: 1 },
    { title: "Monthly Budget", value: "$0", icon: "🎯", idx: 2 },
    { title: "Savings", value: "$0", icon: "💰", idx: 3 },
  ]);
  useEffect(() => {
    fetch('http://localhost:3000/expenses')
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
        const totalExpenses = data.reduce((sum, expense) => sum + expense.amount, 0);
        const monthlyBudget = 2000;
        const savings = monthlyBudget - totalExpenses;
        setSummaryData([{ title: "Total Expenses", value: `$${totalExpenses}`, icon: "💵", idx: 1 },
        { title: "Monthly Budget", value: `$${monthlyBudget}`, icon: "🎯", idx: 2 },
        { title: "Savings", value: `$${savings}`, icon: "💰", idx: 3 },]);
      })
      .catch((err) => {
        console.error("Error fetching expenses:", err);
      })

    
  }, [])

  const expenseCategories = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(cat => cat.category === expense.category);
    if (existingCategory) {
      existingCategory.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, []);


  const chartData = {
    labels: expenseCategories.map((item) => item.category), // Labels from the categories
    datasets: [
      {
        label: 'Expenses by Category',
        data: expenseCategories.map((item) => item.amount), // Data points from amounts
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4D5360'
        ], // Color for each category bar or segment
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#4D5360'
        ],
      },
    ],
  };

  const recentExpenses = expenses.slice(0, 5).map(expense => ({
    description: expense.description,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
  }));





  return <div className='dashboardDiv'>
     
    <SummaryCardMenu className="summaryMenu" summaryData={summaryData}></SummaryCardMenu>
    <div className='CommonBox'>
      <CategoryChart data={chartData} className="categorychart"></CategoryChart>
      <RecentExpensesMenu expenses={recentExpenses}></RecentExpensesMenu>
    </div>
  </div>
}
export default Dashboard;