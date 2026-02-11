import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  
} from '@mui/material';
import type {SelectChangeEvent} from '@mui/material'
import { Close } from '@mui/icons-material';
import type { Product } from '../types';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setSelectedColor(event.target.value);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(10, value)));
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', md: '80%', lg: '70%' },
          maxWidth: 1200,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'auto',
        }}
      >
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontFamily: '"Playfair Display", serif' }}>
              {product.name}
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          <Grid container spacing={4}>
            <Grid  size={{xs:12 ,md:6}}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDOTQuNDc3MiA3MCA5MCA3NC40NzcyIDkwIDgwVjEyMEM5MCA5NC40NzcyIDk0LjQ3NzIgOTAgMTAwIDkwSDEwMEMxMDUuNTIzIDkwIDExMCA5NC40NzcyIDExMCAxMDBWMTIwQzExMCAxMjUuNTIzIDEwNS41MjMgMTMwIDEwMCAxMzBIMTAwWiIgZmlsbD0iIzlDQTRBRiIvPgo8L3N2Zz4=';
                  target.alt = 'Image not available';
                }}
              />
            </Grid>

            <Grid  size={{xs:12 ,md:6}}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {product.description}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Rs {product.price.toLocaleString()}
              </Typography>

              <Grid container spacing={3}>
                <Grid  size={{xs:12 ,md:6}}>
                  <FormControl fullWidth>
                    <InputLabel>Size</InputLabel>
                    <Select
                      value={selectedSize}
                      label="Size"
                      onChange={handleSizeChange}
                    >
                      {product.sizes.map((size: string) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid  size={{xs:12 ,sm:6}}>
                  <FormControl fullWidth>
                    <InputLabel>Color</InputLabel>
                    <Select
                      value={selectedColor}
                      label="Color"
                      onChange={handleColorChange}
                    >
                      {product.colors.map((color: string) => (
                        <MenuItem key={color} value={color}>
                          {color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid  size={{xs:12}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body1">Quantity:</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <TextField
                        value={quantity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          handleQuantityChange(parseInt(e.target.value) || 1)
                        }
                        sx={{ width: 60 }}
                        inputProps={{ 
                          min: 1, 
                          max: 10,
                          style: { textAlign: 'center' }
                        }}
                      />
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 10}
                      >
                        +
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                size="small"
                onClick={handleAddToCart}
                sx={{
                  mt: 4,
      
                  background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #6d28d9, #db2777)',
                  },
                }}
              >
                Add to Cart - Rs {(product.price * quantity).toLocaleString()}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;