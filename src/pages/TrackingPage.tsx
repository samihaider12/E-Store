// pages/TrackingPage.tsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid, // Updated to Grid2 for MUI v6
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalShipping,
  Inventory,
  Assignment,
  DoneAll,
  AccessTime,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const steps = [
  { label: 'Order Placed', icon: <Assignment />, description: 'Your order has been received' },
  { label: 'Processing', icon: <Inventory />, description: 'Preparing your order' },
  { label: 'Shipped', icon: <LocalShipping />, description: 'On the way to you' },
  { label: 'Out for Delivery', icon: <AccessTime />, description: 'Almost there!' },
  { label: 'Delivered', icon: <DoneAll />, description: 'Order delivered successfully' },
];

const trackingData = [
  {
    id: 'ORD-2024-001',
    status: 4,
    date: '2024-01-15',
    estimatedDelivery: '2024-01-20',
    items: ['Elegant Silk Kaftan', 'Traditional Abaya'],
    address: '123 Fashion Street, Karachi',
  },
  {
    id: 'ORD-2024-002',
    status: 2,
    date: '2024-01-16',
    estimatedDelivery: '2024-01-22',
    items: ['Wedding Lehnga'],
    address: '456 Style Avenue, Lahore',
  },
];

const TrackingPage: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [searchResult, setSearchResult] = useState<typeof trackingData[0] | null>(null);

  const handleSearch = () => {
    if (!trackingId.trim()) return;
    const result = trackingData.find(order => order.id === trackingId.toUpperCase());
    setSearchResult(result || null);
  };

  const getStatusColor = (status: number) => {
    const colors = ['error', 'warning', 'info', 'info', 'success'];
    return colors[status] as 'error' | 'warning' | 'info' | 'success';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* FULL WIDTH HERO SECTION */}
      <Box 
        sx={{ 
          width: '100%', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          pt: 10, 
          pb: 14,
          mt:-8, 
          textAlign: 'center',
          color: 'white'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
            }}
          >
            Track Your Order
          </Typography>
          <Typography sx={{ fontSize: "8px", fontWeight: 400, opacity: 0.9, maxWidth: '600px', mx: 'auto', px: 2 }}>
            Enter your order ID below to see exactly where your premium fashion pieces are.
          </Typography>
        </motion.div>
      </Box>

      {/* CONTENT SECTION (INSIDE CONTAINER) */}
      <Container maxWidth="lg" sx={{ mt: -8, pb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Section */}
          <Paper 
            elevation={10} 
            sx={{ 
              p: { xs: 2, md: 4 }, 
              mb: 6, 
              borderRadius: "8px",
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="Order ID"
                  placeholder="e.g., ORD-2024-001"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'primary.main' }} />,
                    sx: { borderRadius: 3 }
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSearch}
                  sx={{
                    height: '56px',
                    borderRadius: 3,
                     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    },
                  }}
                >
                  Track Now
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Rest of the UI remains clean and beautiful */}
          {/* Recent Orders */}
          <Typography variant="h5" sx={{ mb: 3, fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
            Recent Orders
          </Typography>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {trackingData.map((order) => (
              <Grid size={{ xs: 12, md: 6 }} key={order.id}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "8px",
                    border: '1px solid #eee',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' },
                  }}
                  onClick={() => {
                    setTrackingId(order.id);
                    setSearchResult(order);
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">{order.id}</Typography>
                        <Typography variant="body2" color="text.secondary">Ordered: {order.date}</Typography>
                      </Box>
                      <Chip 
                        label={steps[order.status].label} 
                        color={getStatusColor(order.status)} 
                        sx={{ fontWeight: 600, borderRadius: "8px", }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                      {order.items.join(' • ')}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ bgcolor: '#f0f0f0', px: 1, py: 0.5, borderRadius: 1 }}>
                        Est: {order.estimatedDelivery}
                      </Typography>
                      <Button size="small" variant="text">Track Details</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Tracking Results Area */}
          {searchResult && (
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: "8px", border: '1px solid #eee', mb: 6 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 500 }}>
                  Order Status
                </Typography>
                <Typography color="text.secondary">Order ID: {searchResult.id}</Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={(searchResult.status / (steps.length - 1)) * 100}
                sx={{ height: 10, borderRadius: "8px", mb: 4, bgcolor: '#eee' }}
              />

              <Stepper activeStep={searchResult.status} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel icon={
                      <Box sx={{ 
                        width: 40, height: 40, borderRadius: "8px", display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: index <= searchResult.status ? 'primary.main' : '#e0e0e0', color: 'white'
                      }}>
                        {step.icon}
                      </Box>
                    }>
                      <Typography variant="h6" fontWeight={index <= searchResult.status ? 700 : 400}>{step.label}</Typography>
                      <Typography variant="body2" color="text.secondary">{step.description}</Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          )}

          {/* Help Section */}
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: "8px", bgcolor: '#f1f5f9', border: 'none' }}>
            <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}>Need Assistance?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Our support team is available 24/7 to help you with your shipment.</Typography>
            <Button variant="outlined" sx={{ borderRadius: 2 }}>Contact Support</Button>
          </Paper>

        </motion.div>
      </Container>
    </Box>
  );
};

export default TrackingPage;