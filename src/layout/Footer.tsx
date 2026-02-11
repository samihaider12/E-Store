import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  Pinterest,
  YouTube,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',

      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ p: 4 }}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                }}
              >
                <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                  F
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                Farhan's Store
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, color: 'grey.400' }}>
              Premium Pakistani fashion for the modern, elegant woman.
              Experience luxury in every thread.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}>
                <Pinterest />
              </IconButton>
              <IconButton sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}>
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/products?category=kaftans" color="grey.400" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Kaftans
              </Link>

              <Link component={RouterLink} to="/products?category=wedding" color="grey.400" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Wedding Dresses
              </Link>
              <Link component={RouterLink} to="/products?category=party" color="grey.400" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Party Dresses
              </Link>
              <Link component={RouterLink} to="/products" color="grey.400" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                All Collections
              </Link>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
              Help
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/contact" color="grey.400" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Contact Us
              </Link>
              <Link component={RouterLink} to="/tracking" color="grey.400" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Track Order
              </Link>
              <Link component={RouterLink} to="/about" color="grey.400" sx={{ textDecoration: 'none', '&:hover': { color: 'white' } }}>
                About Us
              </Link>

            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: 'grey.400' }} />
                <Typography variant="body2" color="grey.400">
                  123 Fashion Street, Style District, Karachi, Pakistan
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: 'grey.400' }} />
                <Typography variant="body2" color="grey.400">
                  +92 300 1234567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: 'grey.400' }} />
                <Typography variant="body2" color="grey.400">
                  info@farhansstore.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: 'grey.700' }} />

        {/* Copyright */}
        <Box sx={{ display: 'flex', fontSize: "10px", flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 , p:"4px"}}>
          <Typography color="grey.400" sx={{ fontSize: "10px" }}>
            © {new Date().getFullYear()} Farhan's Store. All rights reserved.
          </Typography>
          <Box sx={{ gap: 3 }}>
            <Link component={RouterLink} to="#" color="grey.400" sx={{ fontSize: "10px", textDecoration: 'none', '&:hover': { color: 'white' }, }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="#" color="grey.400" sx={{ fontSize: "10px", textDecoration: 'none', '&:hover': { color: 'white' }, }}>
              Terms of Service
            </Link>
            <Link component={RouterLink} to="#" color="grey.400" sx={{ fontSize: "10px", textDecoration: 'none', '&:hover': { color: 'white' }, }}>
              Return Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;