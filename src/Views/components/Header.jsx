import React, { useState } from 'react';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Header.css';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header className="header">
      <div className="header-logo">
        <WalletIcon
          aria-describedby={id}
          onClick={handleClick}
          className="WalletIcon"
        />
        <a href="/dashboard">ExpenseEase</a>
        
      </div>

      {/* Menu for larger screens */}
      <nav className={`header-nav ${menuOpen ? 'show' : ''}`}>
        <a href="/expense-form" onClick={() => setMenuOpen(false)}>Add Expense</a>
        <a href="/expense-history" onClick={() => setMenuOpen(false)}>Expense History</a>
        <a href="/" onClick={() => setMenuOpen(false)}>Settings</a>
      </nav>

     
     <div className='iconBox'>
      <div className="header-profile">
        <AccountBoxIcon className="profile-icon" />
      </div>
       {/* Hamburger menu for smaller screens */}
       <div className="hamburger-menu">
        {menuOpen ? (
          <CloseIcon className="menu-icon" onClick={toggleMenu} />
        ) : (
          <MenuIcon className="menu-icon" onClick={toggleMenu} />
        )}
      </div>
      </div>
    </header>
  );
}

export default Header;

