import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Container,
  Menu,
  MenuItem,
  Typography,
  useScrollTrigger,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  Home,
  Store,
  LocalShipping,
  Info,
  ContactMail,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';

interface Props {
  window?: () => Window;
}

const Navbar: React.FC<Props> = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <Home sx={{ mr: 1 }} /> },
    { label: 'Products', path: '/products', icon: <Store sx={{ mr: 1 }} /> },
    { label: 'Track Order', path: '/tracking', icon: <LocalShipping sx={{ mr: 1 }} /> },
    { label: 'About', path: '/about', icon: <Info sx={{ mr: 1 }} /> },
    { label: 'Contact', path: '/contact', icon: <ContactMail sx={{ mr: 1 }} /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            mr: 1,
          }}
        >
          <Typography sx={{ color: 'black', fontWeight: 'bold' }}>F</Typography>
        </Avatar>
        <Typography  sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 500 }}>
          Farhan's Store
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                textAlign: 'center',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'black',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', color: location.pathname === item.path ? 'black' : 'text.primary' }}>
                {item.icon}
              </Box>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  // Check if current path is home page
  const isHomePage = location.pathname === '/';

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger || !isHomePage ? 'background.paper' : 'transparent',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          borderBottom: trigger || !isHomePage ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
          boxShadow: trigger || !isHomePage ? 1 : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Left: Logo and Mobile Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: 2, 
                  display: { sm: 'none' },
                  color: trigger || !isHomePage ? 'text.primary' : 'black',
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <Box 
                component={RouterLink}
                to="/"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }}
                >
                  <Typography sx={{ color: 'black', fontWeight: 'bold' }}>F</Typography>
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: trigger || !isHomePage ? 'text.primary' : 'black',
                    fontFamily: '"Playfair Display", serif',
                    textShadow: !trigger && isHomePage ? '2px 2px 4px rgba(0,0,0,0.3)' : 'none',
                  }}
                >
                  Farhan's Store
                </Typography>
              </Box>
            </Box>

            {/* Center: Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: trigger || !isHomePage ? 'text.primary' : 'black',
                    textShadow: !trigger && isHomePage ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none',
                    '&:hover': {
                      color: trigger || !isHomePage ? 'primary.main' : 'black',
                      backgroundColor: !trigger && isHomePage ? 'rgba(255,255,255,0.1)' : 'transparent',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -5,
                      left: 0,
                      width: location.pathname === item.path ? '100%' : 0,
                      height: 2,
                      background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Right: Cart and User Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                component={RouterLink}
                to="/cart"
                sx={{
                  color: trigger || !isHomePage ? 'text.primary' : 'black',
                  '&:hover': { 
                    color: 'primary.main',
                    backgroundColor: !trigger && isHomePage ? 'rgba(255,255,255,0.1)' : 'transparent',
                  },
                }}
              >
                <Badge 
                  badgeContent={totalItems} 
                  sx={{
                    '& .MuiBadge-badge': {
                      background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: 'black',
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
              
              <IconButton
                onClick={handleMenuClick}
                sx={{
                  color: trigger || !isHomePage ? 'text.primary' : 'black',
                  '&:hover': { 
                    color: 'primary.main',
                    backgroundColor: !trigger && isHomePage ? 'rgba(255,255,255,0.1)' : 'transparent',
                  },
                }}
              >
                <Person />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    boxShadow: (theme) => `0 10px 40px ${theme.palette.primary.main}20`,
                    mt: 1,
                  },
                }}
              >
                <MenuItem 
                  onClick={() => { navigate('/'); handleMenuClose(); }}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'black',
                    },
                  }}
                >
                  <Person sx={{ mr: 1 }} />
                  My Account
                </MenuItem>
                <MenuItem 
                  onClick={() => { navigate('/tracking'); handleMenuClose(); }}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'black',
                    },
                  }}
                >
                  <LocalShipping sx={{ mr: 1 }} />
                  Track Orders
                </MenuItem>
                <MenuItem 
                  onClick={() => { navigate('/cart'); handleMenuClose(); }}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'black',
                    },
                  }}
                >
                  <ShoppingCart sx={{ mr: 1 }} />
                  View Cart
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              backgroundColor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;