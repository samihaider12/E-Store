import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  CheckCircle,
  ShoppingBag,
  LocalShipping,
  Email,
  Phone,
  Home,
  ArrowForward,
  Share,
  Print,
  Download,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const OrderConfirmationPage: React.FC = () => {
  const orderId = `ORD-${Date.now().toString().slice(-8)}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();

  const orderDetails = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    items: [
      { name: 'Elegant Silk Kaftan', price: 15999, quantity: 1, size: 'M', color: 'Navy Blue' },
      { name: 'Traditional Abaya', price: 8999, quantity: 2, size: 'L', color: 'Black' },
    ],
    shipping: {
      name: 'John Doe',
      address: '123 Fashion Street, Style District',
      city: 'Karachi',
      zipCode: '75500',
      country: 'Pakistan',
      phone: '+92 300 1234567',
      email: 'john.doe@example.com',
    },
    payment: {
      method: 'Cash on Delivery',
      subtotal: 33997,
      shipping: 0,
      tax: 4419.61,
      total: 38416.61,
    },
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Order Confirmation - ${orderId}`,
        text: `I just placed an order on Farhan's Store! Order ID: ${orderId}`,
        url: window.location.href,
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Message */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 2,
            }}
          >
            Order Confirmed!
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            Thank you for your purchase. Your order has been received.
          </Typography>
          <Chip
            label={`Order ID: ${orderId}`}
            color="primary"
            sx={{ fontSize: '1.1rem', py: 2, px: 3 }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid size={{xs:12,md:8}}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                Order Summary
              </Typography>

              <List>
                {orderDetails.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <ShoppingBag color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        secondary={`Size: ${item.size} • Color: ${item.color}`}
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body1" fontWeight="medium">
                          Rs {item.price.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Qty: {item.quantity}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < orderDetails.items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              {/* Price Breakdown */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid  size={{xs:6}}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                </Grid>
                <Grid  size={{xs:6}} sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">
                    Rs {orderDetails.payment.subtotal.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid  size={{xs:6}}>
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                </Grid>
                <Grid  size={{xs:6}} sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">
                    {orderDetails.payment.shipping === 0 ? 'Free' : `Rs ${orderDetails.payment.shipping}`}
                  </Typography>
                </Grid>
                <Grid  size={{xs:6}}>
                  <Typography variant="body2" color="text.secondary">
                    Tax (13%)
                  </Typography>
                </Grid>
                <Grid  size={{xs:6}} sx={{ textAlign: 'right' }}>
                  <Typography variant="body2">
                    Rs {orderDetails.payment.tax.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  Rs {orderDetails.payment.total.toLocaleString()}
                </Typography>
              </Box>
            </Paper>

            {/* Shipping Details */}
            <Paper elevation={0} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                Shipping Details
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{xs:12,sm:6}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Home color="primary" />
                    <Typography variant="subtitle1">Shipping Address</Typography>
                  </Box>
                  <Typography variant="body1">{orderDetails.shipping.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {orderDetails.shipping.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {orderDetails.shipping.city}, {orderDetails.shipping.zipCode}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {orderDetails.shipping.country}
                  </Typography>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocalShipping color="primary" />
                    <Typography variant="subtitle1">Delivery Information</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Estimated Delivery:</strong> {estimatedDelivery}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Shipping Method:</strong> Standard Delivery
                  </Typography>
                  <Typography variant="body2">
                    <strong>Payment Method:</strong> {orderDetails.payment.method}
                  </Typography>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Phone color="primary" />
                    <Typography variant="subtitle1">Contact Information</Typography>
                  </Box>
                  <Typography variant="body2">{orderDetails.shipping.phone}</Typography>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Email color="primary" />
                    <Typography variant="subtitle1">Email</Typography>
                  </Box>
                  <Typography variant="body2">{orderDetails.shipping.email}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid size={{xs:12,md:4}}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              {/* Actions */}
              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                  Next Steps
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    component={RouterLink}
                    to="/tracking"
                    variant="contained"
                    fullWidth
                    startIcon={<LocalShipping />}
                  >
                    Track Your Order
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outlined"
                    fullWidth
                    startIcon={<Print />}
                  >
                    Print Invoice
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outlined"
                    fullWidth
                    startIcon={<Share />}
                    disabled={!navigator.share}
                  >
                    Share Order
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Download />}
                  >
                    Download Invoice
                  </Button>
                </Box>
              </Paper>

              {/* Help Card */}
              <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, backgroundColor: 'info.light' }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                  Need Help?
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  If you have any questions about your order, please don't hesitate to contact our customer support.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/contact"
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: 'info.main' }}
                >
                  Contact Support
                </Button>
              </Paper>

              {/* Continue Shopping */}
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                  Continue Shopping
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Explore more beautiful collections from Farhan's Store.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/products"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                >
                  Browse Collections
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Important Information */}
        <Alert severity="info" sx={{ mt: 6 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Important Information:
          </Typography>
          <Typography variant="body2">
            • You will receive an order confirmation email shortly.
            <br />
            • For cash on delivery orders, please have the exact amount ready.
            <br />
            • If you need to modify your order, please contact us within 2 hours.
            <br />
            • Returns are accepted within 7 days of delivery for eligible items.
          </Typography>
        </Alert>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
              '&:hover': {
                background: 'linear-gradient(45deg, #6d28d9, #db2777)',
              },
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default OrderConfirmationPage;