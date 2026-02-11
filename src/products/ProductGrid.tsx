import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
// Correct import path
import ProductCard from '../products/ProductCard';
import products from '../data/products.json';

interface ProductGridProps {
  title?: string;
  category?: string;
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title = "Our Products", 
  category, 
  limit 
}) => {
  // Filter products by category if specified
  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter(product => product.category === category);
  }
  
  // Limit products if specified
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 4, 
          fontFamily: '"Playfair Display", serif',
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>
      
      {filteredProducts.length === 0 ? (
        <Typography variant="h6" color="text.secondary" textAlign="center">
          No products found in this category.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid size={{xs:12 ,sm:6 ,md:4 ,lg:3}} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductGrid;