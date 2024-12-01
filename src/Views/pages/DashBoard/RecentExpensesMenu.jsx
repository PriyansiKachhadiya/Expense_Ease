import { Paper, List, ListItem } from '@mui/material';
import RecentExpense from './RecentExpense';

function RecentExpensesMenu({ expenses }) {
    return (
        <div className='expense-menu'>
            
        <Paper  elevation={3} style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            
            <List>
                {expenses.map((expense, index) => (
                    <div className='expense-menu-list' key={index}>
                        <ListItem>
                            <RecentExpense
                                date={expense.date}
                                amount={expense.amount}
                                category={expense.category}
                                description={expense.description}
                            />
                        </ListItem>
                        {/* {index < expenses.length - 1 && <Divider />} Divider between items */}
                    </div>
                ))}
            </List>
        </Paper>
        </div> 
    );
}

export default RecentExpensesMenu;
