import { ListItemText, ListItemIcon } from '@mui/material';
import MoneyIcon from '@mui/icons-material/AttachMoney';

function RecentExpense({ date, amount, category, description }) {
    return (
        <>
            <ListItemIcon>
                <MoneyIcon style={{ color: '#50E3C2' }} /> {/* Teal Accent Color */}
            </ListItemIcon>
            <ListItemText
                primary={category}
                secondary={`$${amount} - ${date} - ${description}`}
                primaryTypographyProps={{ color: 'textPrimary' }}
                secondaryTypographyProps={{ color: 'textSecondary' }}
            />
            
        </>
    );
}

export default RecentExpense;
