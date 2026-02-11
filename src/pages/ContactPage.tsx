import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    
    // Reset submission status after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const contactInfo = [
    {
      icon: <Phone />,
      title: 'Phone',
      details: ['+92 300 1234567', '+92 21 1234567'],
      description: 'Monday to Friday, 9am to 6pm',
    },
    {
      icon: <Email />,
      title: 'Email',
      details: ['info@farhansstore.com', 'support@farhansstore.com'],
      description: 'We reply within 24 hours',
    },
    {
      icon: <LocationOn />,
      title: 'Office',
      details: ['123 Fashion Street', 'Style District, Karachi', 'Pakistan'],
      description: 'Visit us by appointment',
    },
    {
      icon: <AccessTime />,
      title: 'Working Hours',
      details: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm', 'Sunday: Closed'],
      description: 'Customer support available 24/7',
    },
  ];

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 7 days of delivery for items in their original condition with tags attached.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping within Pakistan takes 3-5 business days. Express shipping is available for urgent orders.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship worldwide. International delivery typically takes 7-14 business days.',
    },
    {
      question: 'Can I modify my order after placing it?',
      answer: 'You can modify your order within 2 hours of placement by contacting our customer support.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                mb: 3,
                textAlign: 'center',
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                maxWidth: 800,
                mx: 'auto',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              We're here to help. Reach out to us for any questions about our products, 
              orders, or just to say hello!
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid size={{xs:12 ,md:4}}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  mb: 4,
                }}
              >
                Contact Information
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Feel free to reach out to us through any of the following channels. 
                Our team is always ready to assist you.
              </Typography>

              <Stack spacing={4}>
                {contactInfo.map((info, index) => (
                  <Card
                    key={info.title}
                    elevation={0}
                    sx={{
                      backgroundColor: 'grey.50',
                      borderRadius: 3,
                      borderLeft: '4px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {React.cloneElement(info.icon, { sx: { color: 'primary.contrastText' } })}
                        </Box>
                        <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif' }}>
                          {info.title}
                        </Typography>
                      </Box>
                      <Box sx={{ pl: 6 }}>
                        {info.details.map((detail, i) => (
                          <Typography key={i} variant="body1" sx={{ mb: 0.5 }}>
                            {detail}
                          </Typography>
                        ))}
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {info.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>

              {/* Social Media */}
              <Box sx={{ mt: 6 }}>
                <Typography variant="h6" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#E1306C',
                      color: 'white',
                      '&:hover': { backgroundColor: '#C13584' },
                    }}
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#1DA1F2',
                      color: 'white',
                      '&:hover': { backgroundColor: '#1A91DA' },
                    }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: '#E60023',
                      color: 'white',
                      '&:hover': { backgroundColor: '#CC0000' },
                    }}
                  >
                    <Pinterest />
                  </IconButton>
                </Stack>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid size={{xs:12 ,md:8}}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    mb: 3,
                  }}
                >
                  Send Us a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Have questions about our products or need assistance with your order? 
                  Fill out the form below and we'll get back to you as soon as possible.
                </Typography>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert
                      severity="success"
                      icon={<CheckCircle />}
                      sx={{ mb: 4 }}
                    >
                      <Typography variant="body1" fontWeight="medium">
                        Thank you for your message!
                      </Typography>
                      <Typography variant="body2">
                        We've received your inquiry and will get back to you within 24 hours.
                      </Typography>
                    </Alert>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{xs:12 ,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{xs:12 ,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{xs:12 ,sm:6}}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{xs:12 ,sm:6}}>
                      <TextField
                        required
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{xs:12}}>
                      <TextField
                        required
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        multiline
                        rows={6}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{xs:12}}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        sx={{
                          px: 6,
                          py: 1.5,
                          background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #6d28d9, #db2777)',
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>

                <Divider sx={{ my: 6 }} />

                {/* FAQ Section */}
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    mb: 4,
                  }}
                >
                  Frequently Asked Questions
                </Typography>

                <Grid container spacing={3}>
                  {faqs.map((faq, index) => (
                    <Grid size={{xs:12 ,sm:6}} key={index}>
                      <Card elevation={0} sx={{ borderRadius: 3, backgroundColor: 'grey.50' }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                            {faq.question}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {faq.answer}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Alert severity="info" sx={{ mt: 4 }}>
                  <Typography variant="body2">
                    <strong>Note:</strong> For order-related inquiries, please have your order ID ready. 
                    This helps us assist you more efficiently.
                  </Typography>
                </Alert>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Visit Our Store
          </Typography>

          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              height: 400,
              position: 'relative',
            }}
          >
            {/* This would be replaced with an actual Google Maps embed */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <LocationOn sx={{ fontSize: 60, color: 'grey.500', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Map Integration Coming Soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visit us at: 123 Fashion Street, Style District, Karachi
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid size={{xs:12 ,md:4}}>
              <Card elevation={0} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                    Store Hours
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">Monday - Friday: 10am - 8pm</Typography>
                    <Typography variant="body2">Saturday: 10am - 6pm</Typography>
                    <Typography variant="body2">Sunday: 12pm - 5pm</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{xs:12 ,md:4}}>
              <Card elevation={0} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                    Parking
                  </Typography>
                  <Typography variant="body2">
                    Free parking available in the adjacent parking lot. 
                    Valet service available during peak hours.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{xs:12 ,md:4}}>
              <Card elevation={0} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                    Accessibility
                  </Typography>
                  <Typography variant="body2">
                    Our store is wheelchair accessible with ramps and elevators. 
                    Service animals are welcome.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
          color: 'white',
          py: 10,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              mb: 3,
            }}
          >
            Need Immediate Assistance?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Call us now for urgent inquiries or visit our store for personalized service.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              href="tel:+923001234567"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 4,
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Call Now
            </Button>
            <Button
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Get Directions
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage;