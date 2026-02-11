import React, { useState } from 'react';
import { 
  useParams,
  Link as RouterLink 
} from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Snackbar,
  Alert,
  Card,
  CardMedia,
  Rating,
} from '@mui/material';
import { ArrowBack, ShoppingCart, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
import products from '../data/products.json';
 

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const product = products.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4">Product not found</Typography>
        <Button 
          component={RouterLink} 
          to="/products"
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSnackbarMessage('Please select a size');
      setOpenSnackbar(true);
      return;
    }

    if (!selectedColor) {
      setSnackbarMessage('Please select a color');
      setOpenSnackbar(true);
      return;
    }

    setSnackbarMessage(`${product.name} added to cart!`);
    setOpenSnackbar(true);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button
        component={RouterLink}
        to="/products"
        startIcon={<ArrowBack />}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={6}>
        {/* Product Images */}
        <Grid size={{xs:12,md:6}}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 500,
                  objectFit: 'cover',
                }}
              />
            </Card>
            
            {/* Additional Images Gallery */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              />
            </Stack>
          </motion.div>
        </Grid>

        {/* Product Details */}
        <Grid size={{xs:12,md:6}}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 2 
              }}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating value={4.5} precision={0.5} readOnly sx={{ mr: 2 }} />
              <Typography variant="body2" color="text.secondary">
                (45 reviews)
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Rs {product.price.toLocaleString()}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Size Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Select Size
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {product.sizes.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      mb: 1,
                      border: selectedSize === size ? 2 : 1,
                      borderColor: selectedSize === size ? 'primary.main' : 'grey.400',
                      backgroundColor: selectedSize === size ? 'primary.light' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Color Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Select Color
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {product.colors.map((color) => (
                  <Chip
                    key={color}
                    label={color}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      mb: 1,
                      border: selectedColor === color ? 2 : 1,
                      borderColor: selectedColor === color ? 'primary.main' : 'grey.400',
                      backgroundColor: selectedColor === color ? 'primary.light' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quantity
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  sx={{ minWidth: 40, height: 40 }}
                >
                  -
                </Button>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleIncrement}
                  sx={{ minWidth: 40, height: 40 }}
                >
                  +
                </Button>
              </Stack>
            </Box>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                size="large"
                sx={{
                  flex: 1,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #6d28d9, #db2777)',
                  },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                startIcon={<Favorite />}
                size="large"
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              >
                Add to Wishlist
              </Button>
            </Stack>

            {/* Product Info */}
            <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Product Information
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" sx={{ minWidth: 100, fontWeight: 600 }}>
                    Category:
                  </Typography>
                  <Typography variant="body2">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" sx={{ minWidth: 100, fontWeight: 600 }}>
                    Available Sizes:
                  </Typography>
                  <Typography variant="body2">
                    {product.sizes.join(', ')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" sx={{ minWidth: 100, fontWeight: 600 }}>
                    Available Colors:
                  </Typography>
                  <Typography variant="body2">
                    {product.colors.join(', ')}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetailPage;