import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  SentimentDissatisfied,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SentimentDissatisfied sx={{ fontSize: 100, color: 'grey.400', mb: 3 }} />
        
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '3rem', md: '4rem' },
            mb: 2,
          }}
        >
          404
        </Typography>
        
        <Typography variant="h4" sx={{ mb: 3, color: 'text.secondary' }}>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Oops! The page you're looking for seems to have wandered off. 
          It might have been moved, deleted, or perhaps never existed in the first place.
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 3,
            backgroundColor: 'grey.50',
            maxWidth: 500,
            mx: 'auto',
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
            Here are some helpful links:
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              startIcon={<HomeIcon />}
              sx={{
                background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #6d28d9, #db2777)',
                },
              }}
            >
              Go to Homepage
            </Button>
            
            <Button
              component={RouterLink}
              to="/products"
              variant="outlined"
              startIcon={<SearchIcon />}
            >
              Browse Products
            </Button>
          </Box>
        </Paper>

        <Typography variant="body2" color="text.secondary">
          If you believe this is an error, please{' '}
          <Button component={RouterLink} to="/contact" sx={{ textTransform: 'none' }}>
            contact our support team
          </Button>
        </Typography>
      </motion.div>
    </Container>
  );
};

export default NotFoundPage;