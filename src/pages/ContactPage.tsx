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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Map position for Karachi, Pakistan
  const position: L.LatLngExpression = [24.8607, 67.0011]; // Latitude, Longitude

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
          mt: -8,
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
                fontWeight: 500,
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
          <Grid size={{xs:12,md:4}}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 500,
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
                {contactInfo.map((info) => (
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
                            backgroundColor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {React.cloneElement(info.icon, { sx: { color: 'white' } })}
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
                <Typography sx={{ mb: 3, fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
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
          <Grid size={{xs:12,md:8}}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Paper elevation={0} sx={{ p: 4, borderRadius: "8px", border: '1px solid', borderColor: 'divider' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 500,
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
                    <Grid size={{xs:12,sm:6}}>
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
                    <Grid size={{xs:12,sm:6}}>
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
                    <Grid size={{xs:12,sm:6}}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{xs:12,sm:6}}>
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
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
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
                    fontWeight: 500,
                    mb: 4,
                  }}
                >
                  Frequently Asked Questions
                </Typography>

                <Grid container spacing={3}>
                  {faqs.map((faq, index) => (
                    <Grid size={{xs:12,sm:6}} key={index}>
                      <Card elevation={0} sx={{  borderRadius: "8px", backgroundColor: 'grey.50', height: '100%' }}>
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
              fontWeight: 500,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Visit Our Store
          </Typography>

          <Paper
            elevation={3}
            sx={{
               borderRadius: "8px",
              overflow: 'hidden',
              height: 500,
              border: '5px solid white',
              zIndex: 1
            }}
          >
            {/* React Leaflet Map - Fixed Props */}
            <MapContainer 
                center={position} 
                zoom={13} 
                scrollWheelZoom={false} 
                style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <b>Farhan's Store</b> <br /> 123 Fashion Street, Karachi.
                </Popup>
              </Marker>
            </MapContainer>
          </Paper>

<Grid container spacing={4} sx={{ mt: 4 }}>
  {/* Store Hours */}
  <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: "8px", 
        border: '1px solid', 
        borderColor: 'divider',
        width: '100%', // Ensure it stretches horizontally
        display: 'flex',
        flexDirection: 'column',
        height: '100%' // This makes all cards in the row the same height
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
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

  {/* Parking */}
  <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: "8px", 
        border: '1px solid', 
        borderColor: 'divider',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%' 
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
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
  
  {/* Accessibility */}
  <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
    <Card 
      elevation={0} 
      sx={{ 
        borderRadius: "8px", 
        border: '1px solid', 
        borderColor: 'divider',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%' 
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 10,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 500,
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
                fontWeight: 'bold',
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