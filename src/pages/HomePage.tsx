// pages/HomePage.tsx
import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowForward,
  LocalShipping,
  Security,
  Star,
  CheckCircle,
} from '@mui/icons-material';
import productsData from '../data/products.json';
import ProductCard from '../products/ProductCard';
import type { Product } from '../types';

const HomePage: React.FC = () => {
  const featuredProducts = (productsData as Product[]).slice(0, 4);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{xs:12,md:6}}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Chip
                  label="🎨 Premium Pakistani Fashion"
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    mb: 3,
                    fontSize: '0.875rem',
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    mb: 2,
                  }}
                >
                  Discover Elegance
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'block',
                      background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    & Style
                  </Box>
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, color: 'rgba(255,255,255,0.9)' }}>
                  Step into a world of exquisite traditional and modern clothing.
                  Each piece tells a story of timeless beauty.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={RouterLink}
                    to="/products"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                    }}
                  >
                    Explore Collection
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/about"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Our Story
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid size={{xs:12,md:6}}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="video"
                    src="/src/assets/projectVideo.mp4"  
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    sx={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}>
                      Wedding Lehnga
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                      Luxurious comfort meets timeless style
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Rs 15,999
                      </Typography>
                      <Button
                        component={RouterLink}
                        to="/products"
                        variant="contained"
                        size="small"
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid size={{xs:12,sm:6,md:3}}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
              }}
            >
              <LocalShipping sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}>
                Free Delivery
              </Typography>
              <Typography variant="body2">
                Free shipping on orders above Rs 10,000
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{xs:12,sm:6,md:3}}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                backgroundColor: 'secondary.light',
                color: 'secondary.contrastText',
              }}
            >
              <Security sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}>
                Secure Payment
              </Typography>
              <Typography variant="body2">
                100% secure payments with multiple options
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{xs:12,sm:6,md:3}}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                backgroundColor: 'success.light',
                color: 'success.contrastText',
              }}
            >
              <CheckCircle sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}>
                Premium Quality
              </Typography>
              <Typography variant="body2">
                Hand-picked fabrics and meticulous craftsmanship
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{xs:12,sm:6,md:3}}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                backgroundColor: 'warning.light',
                color: 'warning.contrastText',
              }}
            >
              <Star sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}>
                24/7 Support
              </Typography>
              <Typography variant="body2">
                Dedicated customer support round the clock
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Products */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Featured Collections
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Handpicked just for you
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featuredProducts.map((product: Product) => (
            <Grid key={product.id} size={{xs:12,sm:6,md:3}}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={RouterLink}
            to="/products"
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
          >
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
          py: 10,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to Elevate Your Style?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of satisfied customers who trust Farhan's Store for premium fashion.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Start Shopping
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ px: 4 }}
            >
              Contact Us
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 