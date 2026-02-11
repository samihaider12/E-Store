// pages/ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid, 
  TextField,
  MenuItem,
  Typography,
  Paper,
  InputAdornment,
  Chip,
  Stack,
  Container
} from '@mui/material';
import {
  Search,
  FilterList,
  Sort,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import productsData from '../data/products.json';
import ProductGrid from '../products/ProductGrid';
import type { Product } from '../types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'kaftans', label: 'Kaftans' },
    { value: 'abayas', label: 'Abayas' },
    { value: 'wedding', label: 'Wedding Dresses' },
    { value: 'party', label: 'Party Dresses' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  // Logic untouched as requested
  useEffect(() => {
    let filtered = [...productsData] as Product[];
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    if (sortBy === 'price-low') {
      filtered.sort((a: Product, b: Product) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a: Product, b: Product) => b.price - a.price);
    } else {
      filtered.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
    }
    setProducts(filtered);
  }, [searchTerm, category, sortBy, selectedCategories]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.includes(cat)
        ? prev.filter((c: string) => c !== cat)
        : [...prev, cat]
    );
  };

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        mt: -9,
         
      }}
    >
      {/* Hero Header Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        pt: 4, pb: 13, px: 2, textAlign: 'center' 
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 500,
              fontSize: { xs: '32px', md: '48px' },
              color: 'white',
              textShadow: '0px 4px 10px rgba(0,0,0,0.2)',
              mb: 1
            }}
          >
            Our Collection
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            Discover elegance in every stitch
          </Typography>
        </motion.div>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -10 }}> {/* Overlap effect for stability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: { xs: 2, md: 4 },
              mb: 5,
              borderRadius: "12px",
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder="Search styles..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3, bgcolor: '#f8f9fa' },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={category}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FilterList sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3, bgcolor: '#f8f9fa' },
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  select
                  label="Sort"
                  value={sortBy}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSortBy(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Sort sx={{ color: 'primary.main' }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: "8px", bgcolor: '#f8f9fa' },
                  }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: 'wrap', gap: 1 }}>
              {['kaftans', 'abayas', 'wedding', 'party'].map((cat: string) => (
                <Chip
                  key={cat}
                  label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                  onClick={() => handleCategoryClick(cat)}
                  color={selectedCategories.includes(cat) ? 'primary' : 'default'}
                  variant={selectedCategories.includes(cat) ? 'filled' : 'outlined'}
                  sx={{ 
                    fontWeight: 500,
                    px: 1,
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-2px)' } 
                  }}
                />
              ))}
            </Stack>
          </Paper>

          {/* Product Grid Area */}
          <Box sx={{ minHeight: '400px' }}>
             <ProductGrid products={products} />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProductsPage;