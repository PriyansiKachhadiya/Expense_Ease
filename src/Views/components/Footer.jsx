import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#2C3E50', // Dark Navy
                color: '#F5F7FA',           // Light Gray Text
                padding: '20px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                
                width: '100%',

            }}
        >
            {/* Title */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                ExpenseEase
            </Typography>
          
            
            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <IconButton href="https://facebook.com" target="_blank" color="inherit">
                    <Facebook sx={{ color: '#50E3C2' }} /> {/* Teal */}
                </IconButton>
                <IconButton href="https://twitter.com" target="_blank" color="inherit">
                    <Twitter sx={{ color: '#50E3C2' }} />
                </IconButton>
                <IconButton href="https://instagram.com" target="_blank" color="inherit">
                    <Instagram sx={{ color: '#50E3C2' }} />
                </IconButton>
                <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                    <LinkedIn sx={{ color: '#50E3C2' }} />
                </IconButton>
            </Box>
            
            {/* Copyright */}
            <Typography variant="body2" sx={{ color: '#FF6B6B' }}> {/* Coral color */}
                &copy; {new Date().getFullYear()} ExpenseEase. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
