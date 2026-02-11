import React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  Button, 
  Divider, 
  IconButton,
  Stack
} from '@mui/material';
import { ShoppingCart, Close } from '@mui/icons-material';
import { useCart } from '../context/CartContext'; // Changed import
import { Link as RouterLink } from 'react-router-dom';

interface CartPreviewProps {
  open: boolean;
  onClose: () => void;
}

const CartPreview: React.FC<CartPreviewProps> = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart(); // Changed to useCart

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCart sx={{ mr: 1 }} />
            Your Cart ({totalItems}) {/* Changed from getTotalItems() */}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Your cart is empty
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              {cart.map((item) => (
                <Box key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Size: {item.selectedSize} | Color: {item.selectedColor}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    Rs {item.price.toLocaleString()} x {item.quantity}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Stack direction="row" spacing={1}>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Typography sx={{ alignSelf: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <Button 
                        size="small" 
                        variant="outlined"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </Stack>
                    <Button 
                      size="small" 
                      color="error"
                      onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Total: Rs {totalPrice.toLocaleString()} {/* Changed from getTotalPrice() */}
              </Typography>
              <Button
                component={RouterLink}
                to="/checkout"
                variant="contained"
                fullWidth
                size="large"
                onClick={onClose}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartPreview;