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
  useTheme,
  useMediaQuery,
  ListItemIcon,
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
  AccountCircle,
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

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const isHomePage = location.pathname === '/';

  // Always primary color
  const getTextColor = () => theme.palette.primary.main;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleUserMenuClose = () => setUserAnchorEl(null);
  const handleMoreMenuClose = () => setMoreAnchorEl(null);

  const navItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Products', path: '/products', icon: <Store /> },
    { label: 'Track Order', path: '/tracking', icon: <LocalShipping /> },
    { label: 'About', path: '/about', icon: <Info /> },
    { label: 'Contact', path: '/contact', icon: <ContactMail /> },
  ];

  /* =======================
      Mobile Drawer
  ======================== */

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>

      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.main',
          color: '#fff',
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          Farhan's Store
        </Typography>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>

            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                '&:hover': {
                  bgcolor: theme.palette.primary.light,
                  color: '#fff',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />

            </ListItemButton>

          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <>
      {/* =======================
            AppBar
      ======================== */}

      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >

        <Container maxWidth="xl">

          <Toolbar sx={{ justifyContent: 'space-between' }}>

            {/* ================= Logo ================= */}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

              <IconButton
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  color: getTextColor(),
                }}
                onClick={handleDrawerToggle}
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
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 36,
                    height: 36,
                    fontWeight: 'bold',
                  }}
                >
                  F
                </Avatar>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: getTextColor(),
                    display: { xs: 'none', sm: 'block' },
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  Farhan's Store
                </Typography>

              </Box>

            </Box>

            {/* ================= Desktop Nav ================= */}

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>

              {navItems.map((item) => (

                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,

                    '&:hover': {
                      bgcolor: theme.palette.primary.light,
                      color: '#fff',
                    },
                  }}
                >
                  {item.label}
                </Button>

              ))}

            </Box>

            {/* ================= Tablet Nav ================= */}

            <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'none' }, gap: 1 }}>

              {navItems.slice(0, 3).map((item) => (

                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: theme.palette.primary.main,

                    '&:hover': {
                      bgcolor: theme.palette.primary.light,
                      color: '#fff',
                    },
                  }}
                >
                  {item.label}
                </Button>

              ))}

              <Button
                onClick={(e) => setMoreAnchorEl(e.currentTarget)}
                sx={{
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,

                  '&:hover': {
                    bgcolor: theme.palette.primary.light,
                    color: '#fff',
                  },
                }}
              >
                More
              </Button>

            </Box>

            {/* ================= Right Icons ================= */}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              <IconButton
                component={RouterLink}
                to="/cart"
                sx={{
                  color: theme.palette.primary.main,

                  '&:hover': {
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                <Badge badgeContent={totalItems} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>

              <IconButton
                onClick={(e) => setUserAnchorEl(e.currentTarget)}
                sx={{
                  color: theme.palette.primary.main,

                  '&:hover': {
                    color: theme.palette.primary.dark,
                  },
                }}
              >
                <Person />
              </IconButton>

            </Box>

          </Toolbar>

        </Container>

      </AppBar>

      {/* ================= User Menu ================= */}

      <Menu
        anchorEl={userAnchorEl}
        open={Boolean(userAnchorEl)}
        onClose={handleUserMenuClose}
      >

        <MenuItem
          onClick={() => {
            navigate('/profile');
            handleUserMenuClose();
          }}
        >
          <ListItemIcon>
            <AccountCircle color="primary" fontSize="small" />
          </ListItemIcon>

          My Account
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate('/tracking');
            handleUserMenuClose();
          }}
        >
          <ListItemIcon>
            <LocalShipping color="primary" fontSize="small" />
          </ListItemIcon>

          Track Orders
        </MenuItem>

      </Menu>

      {/* ================= More Menu ================= */}

      <Menu
        anchorEl={moreAnchorEl}
        open={Boolean(moreAnchorEl) && isTablet}
        onClose={handleMoreMenuClose}
      >

        {navItems.slice(3).map((item) => (

          <MenuItem
            key={item.label}
            onClick={() => {
              navigate(item.path);
              handleMoreMenuClose();
            }}
          >
            <ListItemIcon color="primary">
              {item.icon}
            </ListItemIcon>

            {item.label}

          </MenuItem>

        ))}

      </Menu>

      {/* ================= Drawer ================= */}

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawer}
      </Drawer>

      {!isHomePage && <Toolbar />}

    </>
  );
};

export default Navbar;
