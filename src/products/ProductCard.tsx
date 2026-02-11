import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import { AddShoppingCart, Visibility } from '@mui/icons-material';
import type { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';  

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Changed to useCart
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleAddToCart = () => {
    if (product.sizes.length === 0) {
      setSnackbarMessage('Product has no available sizes');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (product.colors.length === 0) {
      setSnackbarMessage('Product has no available colors');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    
    addToCart(product, defaultSize, defaultColor, 1);
    
    setSnackbarMessage(`${product.name} added to cart!`);
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="220"
            image={product.image}
            alt={product.name}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDOTQuNDc3MiA3MA==';
              target.alt = 'Image not available';
            }}
          />
          <Chip
            label={product.category}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            gutterBottom 
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 550,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.description}.
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant="body2" color="text.secondary">
              Available in {product.sizes.length} sizes
            </Typography>
            <Rating value={4.5} precision={0.5} size="small" readOnly />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              
            }}
          >
            Rs {product.price.toLocaleString()}
          </Typography>
        </CardContent>

        <CardActions>
          <Stack direction="column" spacing={1} width={"100%"}>
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={handleViewDetails}
              sx={{ 
                height:"30px",
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  color: "white",
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.light',
                }
              }}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
              sx={{ 
                height:"35px",
                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                },
              }}
            >
              Add to Cart
            </Button>
          </Stack>
        </CardActions>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCard;