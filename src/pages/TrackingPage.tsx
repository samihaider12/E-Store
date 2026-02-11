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
  StepConnector,
  Grid,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalShipping,
  CheckCircle,
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
    if (!trackingId.trim()) {
      return;
    }
    const result = trackingData.find(order => order.id === trackingId.toUpperCase());
    setSearchResult(result || null);
  };

  const getStatusColor = (status: number) => {
    const colors = ['error', 'warning', 'info', 'info', 'success'];
    return colors[status] as 'error' | 'warning' | 'info' | 'success';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Track Your Order
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Enter your order ID to track its status and location
          </Typography>
        </Box>

        {/* Search Section */}
        <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{xs:12,md:8}}>
              <TextField
                fullWidth
                label="Enter Order ID"
                placeholder="e.g., ORD-2024-001"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid size={{xs:12,md:4}}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSearch}
                sx={{
                  height: '56px',
                  background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #6d28d9, #db2777)',
                  },
                }}
              >
                Track Order
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Recent Orders */}
        <Typography variant="h5" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
          Recent Orders
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {trackingData.map((order) => (
            <Grid size={{xs:12,md:6}} key={order.id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
                onClick={() => {
                  setTrackingId(order.id);
                  setSearchResult(order);
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">{order.id}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ordered on {order.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={steps[order.status].label}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {order.items.join(', ')}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Estimated: {order.estimatedDelivery}
                    </Typography>
                    <Button size="small" endIcon={<SearchIcon />}>
                      Track
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Tracking Results */}
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 1, fontFamily: '"Playfair Display", serif' }}>
                  Order #{searchResult.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Placed on {searchResult.date} • Estimated delivery: {searchResult.estimatedDelivery}
                </Typography>
              </Box>

              {/* Progress Bar */}
              <Box sx={{ mb: 4 }}>
                <LinearProgress
                  variant="determinate"
                  value={(searchResult.status / (steps.length - 1)) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    mb: 2,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  {steps.map((step, index) => (
                    <Typography
                      key={step.label}
                      variant="caption"
                      sx={{
                        color: index <= searchResult.status ? 'primary.main' : 'text.secondary',
                        fontWeight: index <= searchResult.status ? 'bold' : 'normal',
                      }}
                    >
                      {step.label}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Stepper */}
              <Box sx={{ width: '100%' }}>
                <Stepper
                  activeStep={searchResult.status}
                  orientation="vertical"
                  connector={
                    <StepConnector
                      sx={{
                        '& .MuiStepConnector-line': {
                          borderColor: 'primary.main',
                          borderLeftWidth: 2,
                          minHeight: 40,
                        },
                      }}
                    />
                  }
                >
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        icon={
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: index <= searchResult.status ? 'primary.main' : 'grey.300',
                              color: index <= searchResult.status ? 'white' : 'text.secondary',
                            }}
                          >
                            {step.icon}
                          </Box>
                        }
                        sx={{
                          '& .MuiStepLabel-label': {
                            color: index <= searchResult.status ? 'text.primary' : 'text.secondary',
                            fontWeight: index <= searchResult.status ? 'bold' : 'normal',
                          },
                        }}
                      >
                        <Box>
                          <Typography variant="h6">{step.label}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {step.description}
                          </Typography>
                          {index === searchResult.status && (
                            <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 1 }}>
                              {index === steps.length - 1
                                ? 'Delivered successfully'
                                : `Expected: ${searchResult.estimatedDelivery}`}
                            </Typography>
                          )}
                        </Box>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* Order Details */}
              <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid size={{xs:12,md:6}}>
                  <Card elevation={0} sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                        Order Details
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Order ID:</strong> {searchResult.id}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Order Date:</strong> {searchResult.date}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Items:</strong> {searchResult.items.length}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Delivery Address:</strong> {searchResult.address}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{xs:12,md:6}}>
                  <Card elevation={0} sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                        Shipping Information
                      </Typography>
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Your order is currently at step {searchResult.status + 1} of {steps.length}
                      </Alert>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Current Status:</strong> {steps[searchResult.status].label}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Estimated Delivery:</strong> {searchResult.estimatedDelivery}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Contact Support:</strong> support@farhansstore.com
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        )}

        {!searchResult && trackingId && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            No order found with ID: {trackingId}. Please check your order ID and try again.
          </Alert>
        )}

        {/* Help Section */}
        <Paper elevation={0} sx={{ p: 4, mt: 6, borderRadius: 3, backgroundColor: 'grey.50' }}>
          <Typography variant="h5" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
            Need Help?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            If you're having trouble tracking your order, please contact our customer support.
          </Typography>
          <Button variant="contained" startIcon={<CheckCircle />}>
            Contact Support
          </Button>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default TrackingPage;