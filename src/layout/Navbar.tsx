import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Badge, Box, Drawer, List, ListItem,
  ListItemButton, ListItemText, Button, Container, Menu, MenuItem,
  Typography, useScrollTrigger, Avatar, useTheme, useMediaQuery, ListItemIcon,
} from '@mui/material';

import {
  Menu as MenuIcon, ShoppingCart, Person, Home, Store,
  LocalShipping, Info, ContactMail, AccountCircle,
} from '@mui/icons-material';

import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // --- Fixed Hover Handlers ---
  const handleUserHoverOpen = (event: React.MouseEvent<HTMLElement>) => setUserAnchorEl(event.currentTarget);
  const handleMoreHoverOpen = (event: React.MouseEvent<HTMLElement>) => setMoreAnchorEl(event.currentTarget);
  
  const handleAllClose = () => {
    setUserAnchorEl(null);
    setMoreAnchorEl(null);
  };

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const isHomePage = location.pathname === '/';
  const getTextColor = () => theme.palette.primary.main;
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Products', path: '/products', icon: <Store /> },
    { label: 'Track Order', path: '/tracking', icon: <LocalShipping /> },
    { label: 'About', path: '/about', icon: <Info /> },
    { label: 'Contact', path: '/contact', icon: <ContactMail /> },
  ];

  /* Mobile Drawer Content */
  const drawer = (
    <Box sx={{ textAlign: 'center' }} onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: '#fff' }}>
        <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, fontSize: 22 }}>
          Farhan's Store
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" elevation={trigger ? 4 : 0} sx={{ bgcolor: theme.palette.background.paper, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            
            {/* Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton sx={{ display: { xs: 'flex', sm: 'none' }, color: getTextColor() }} onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontWeight: 'bold' }}>F</Avatar>
                <Typography sx={{ fontWeight: 600, color: getTextColor(), display: { xs: 'none', sm: 'block' }, fontFamily: '"Playfair Display", serif' }}>
                  Farhan's Store
                </Typography>
              </Box>
            </Box>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button key={item.label} component={RouterLink} to={item.path} startIcon={item.icon} sx={{ color: theme.palette.primary.main, fontWeight: 500, '&:hover': { bgcolor: theme.palette.primary.light, color: '#fff' } }}>
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Tablet Nav with Hover */}
            <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'none' }, gap: 1 }}>
              {navItems.slice(0, 3).map((item) => (
                <Button key={item.label} component={RouterLink} to={item.path} sx={{ color: theme.palette.primary.main }}>
                  {item.label}
                </Button>
              ))}
              <Box onMouseLeave={handleAllClose}>
                <Button 
                  onMouseEnter={handleMoreHoverOpen}
                  sx={{ color: theme.palette.primary.main, border: `1px solid ${theme.palette.primary.main}` }}
                >
                  More
                </Button>
              </Box>
            </Box>

            {/* Right Icons with Hover */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton component={RouterLink} to="/cart" sx={{ color: theme.palette.primary.main }}>
                <Badge badgeContent={totalItems} color="primary"><ShoppingCart /></Badge>
              </IconButton>

              <Box onMouseLeave={handleAllClose} sx={{ display: 'inline-block' }}>
                <IconButton
                  onMouseEnter={handleUserHoverOpen}
                  onClick={(e) => setUserAnchorEl(e.currentTarget)} // Support for touch devices
                  sx={{ color: theme.palette.primary.main }}
                >
                  <Person />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ================= User Menu (Fixed Hover) ================= */}
      <Menu
        anchorEl={userAnchorEl}
        open={Boolean(userAnchorEl)}
        onClose={handleAllClose}
        MenuListProps={{
          onMouseEnter: () => setUserAnchorEl(userAnchorEl),
          onMouseLeave: handleAllClose,
        }}
        // Gap fix taake mouse move karte waqt menu band na ho
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ pointerEvents: 'none' }}
        slotProps={{ paper: { sx: { pointerEvents: 'auto', mt: 0.5 } } }}
      >
        <MenuItem onClick={() => { navigate('/contact'); handleAllClose(); }}>
          <ListItemIcon><AccountCircle color="primary" fontSize="small" /></ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem onClick={() => { navigate('/tracking'); handleAllClose(); }}>
          <ListItemIcon><LocalShipping color="primary" fontSize="small" /></ListItemIcon>
          Track Orders
        </MenuItem>
      </Menu>

      {/* ================= More Menu (Fixed Hover) ================= */}
      <Menu
        anchorEl={moreAnchorEl}
        open={Boolean(moreAnchorEl) && isTablet}
        onClose={handleAllClose}
        MenuListProps={{
          onMouseEnter: () => setMoreAnchorEl(moreAnchorEl),
          onMouseLeave: handleAllClose,
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ pointerEvents: 'none' }}
        slotProps={{ paper: { sx: { pointerEvents: 'auto', mt: 0.5 } } }}
      >
        {navItems.slice(3).map((item) => (
          <MenuItem key={item.label} onClick={() => { navigate(item.path); handleAllClose(); }}>
            <ListItemIcon color="primary">{item.icon}</ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      <Drawer open={mobileOpen} onClose={handleDrawerToggle} sx={{ display: { xs: 'block', sm: 'none' } }}>
        {drawer}
      </Drawer>
      {!isHomePage && <Toolbar />}
    </>
  );
};

export default Navbar;