// pages/ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
  InputAdornment,
  Chip,
  Stack,
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

  useEffect(() => {
    let filtered = [...productsData] as Product[];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Sort products
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
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Our Collection
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
            borderRadius: 4,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size={{xs:12, md:6}}>
              <TextField
                fullWidth
                placeholder="Search for your perfect style..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 3, backgroundColor: 'white' },
                }}
              />
            </Grid>

            <Grid size={{xs:12, md:3}}>
              <TextField
                fullWidth
                select
                value={category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterList />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 3, backgroundColor: 'white' },
                }}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{xs:12, md:3}}>
              <TextField
                fullWidth
                select
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSortBy(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Sort />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 3, backgroundColor: 'white' },
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
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Stack>
        </Paper>

        <ProductGrid products={products} />
      </motion.div>
    </Container>
  );
};

export default ProductsPage;