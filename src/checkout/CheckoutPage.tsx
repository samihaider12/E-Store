import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Alert,
  Stepper,
  Step,
  StepLabel,
 
} from '@mui/material';
import {  useNavigate } from 'react-router-dom';
 
import {
  ArrowBack,
  CreditCard,
  AccountBalanceWallet,
  LocalShipping,
  CheckCircle,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const steps = ['Shipping', 'Payment', 'Confirmation'];

const CheckoutPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Pakistan',
    saveInfo: false,
  });

  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Handle order submission
      handlePlaceOrder();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePlaceOrder = () => {
    // Here you would typically send the order to your backend
    console.log('Placing order with data:', {
      ...formData,
      paymentMethod,
      items: cart,
      total: totalPrice,
    });

    // Clear cart and redirect to confirmation
    clearCart();
    navigate('/order-confirmation');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Stepper */}
        <Box sx={{ mb: 6 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Form */}
          <Grid size={{xs:12,md:8}}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
              {activeStep === 0 && (
                <>
                  <Typography variant="h5" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                    Shipping Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid size={{xs:12,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid size={{xs:12,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid size={{xs:12,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid size={{xs:12,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid size={{xs:12}}>
                      <TextField
                        required
                        fullWidth
                        label="Address"
                        multiline
                        rows={2}
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid size={{xs:12,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid size={{xs:12,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="ZIP Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid size={{xs:12}}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={formData.saveInfo}
                            onChange={handleInputChange}
                            name="saveInfo"
                            color="primary"
                          />
                        }
                        label="Save this information for next time"
                      />
                    </Grid>
                  </Grid>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <Typography variant="h5" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                    Payment Method
                  </Typography>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">Choose your payment method</FormLabel>
                    <RadioGroup
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 2,
                          border: paymentMethod === 'cod' ? '2px solid' : '1px solid',
                          borderColor: paymentMethod === 'cod' ? 'primary.main' : 'grey.300',
                          borderRadius: 2,
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'primary.main',
                          },
                        }}
                        onClick={() => setPaymentMethod('cod')}
                      >
                        <FormControlLabel
                          value="cod"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <AccountBalanceWallet />
                              <Box>
                                <Typography variant="body1" fontWeight="medium">
                                  Cash on Delivery
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Pay when you receive your order
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </Paper>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          border: paymentMethod === 'card' ? '2px solid' : '1px solid',
                          borderColor: paymentMethod === 'card' ? 'primary.main' : 'grey.300',
                          borderRadius: 2,
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'primary.main',
                          },
                        }}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <FormControlLabel
                          value="card"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <CreditCard />
                              <Box>
                                <Typography variant="body1" fontWeight="medium">
                                  Credit/Debit Card
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Pay securely with your card
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </Paper>
                    </RadioGroup>
                  </FormControl>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <Typography variant="h5" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                    Order Confirmation
                  </Typography>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle />
                      <Typography>
                        Please review your order details before confirming
                      </Typography>
                    </Box>
                  </Alert>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Shipping Details
                    </Typography>
                    <Typography variant="body1">
                      {formData.firstName} {formData.lastName}
                    </Typography>
                    <Typography variant="body1">{formData.email}</Typography>
                    <Typography variant="body1">{formData.phone}</Typography>
                    <Typography variant="body1">{formData.address}</Typography>
                    <Typography variant="body1">
                      {formData.city}, {formData.zipCode}, {formData.country}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Payment Method
                    </Typography>
                    <Typography variant="body1">
                      {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                    </Typography>
                  </Box>
                </>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    (activeStep === 0 && (!formData.firstName || !formData.email || !formData.address)) ||
                    (activeStep === 1 && !paymentMethod)
                  }
                  sx={{
                    background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #6d28d9, #db2777)',
                    },
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid size={{xs:12,md:4}}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h5" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                Order Summary
              </Typography>

              {/* Cart Items */}
              <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 3 }}>
                {cart.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="medium">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Price Breakdown */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2">Rs {totalPrice.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography variant="body2">
                    {totalPrice > 10000 ? 'Free' : 'Rs 200'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tax
                  </Typography>
                  <Typography variant="body2">Rs {(totalPrice * 0.13).toLocaleString()}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Total */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  Rs {(totalPrice + (totalPrice > 10000 ? 0 : 200) + totalPrice * 0.13).toLocaleString()}
                </Typography>
              </Box>

              <Alert severity="info" icon={<LocalShipping />}>
                <Typography variant="body2">
                  Estimated delivery: 3-5 business days
                </Typography>
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default CheckoutPage;