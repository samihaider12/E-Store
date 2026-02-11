import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Card,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import {
  Palette,
  Security,
  Handshake,
  People,
  History,
  Flag,
  Star,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Farhan Ahmed',
      role: 'Founder & Creative Director',
      image: 'https://i.pravatar.cc/150?img=1',
      bio: 'With over 15 years in fashion design, Farhan brings traditional Pakistani craftsmanship to modern fashion.',
    },
    {
      name: 'Ayesha Khan',
      role: 'Head of Design',
      image: 'https://i.pravatar.cc/150?img=5',
      bio: 'Specializing in traditional embroidery techniques with a contemporary twist.',
    },
    {
      name: 'Zainab Ali',
      role: 'Quality Control Manager',
      image: 'https://i.pravatar.cc/150?img=8',
      bio: 'Ensures every piece meets our premium quality standards before reaching you.',
    },
    {
      name: 'Mohammed Raza',
      role: 'Customer Experience',
      image: 'https://i.pravatar.cc/150?img=11',
      bio: 'Dedicated to making every customer feel valued and heard.',
    },
  ];

  const values = [
    {
      icon: <Palette />,
      title: 'Artistic Excellence',
      description: 'Every piece is a work of art, blending traditional techniques with contemporary design.',
    },
    {
      icon: <Security />,
      title: 'Quality First',
      description: 'We use only the finest fabrics and materials, ensuring durability and comfort.',
    },
    {
      icon: <Handshake />,
      title: 'Ethical Production',
      description: 'Fair wages, safe working conditions, and sustainable practices guide our production.',
    },
    {
      icon: <People />,
      title: 'Customer Love',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our success.',
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
              Our Story
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
              Where tradition meets contemporary elegance. 
              A journey of passion, craftsmanship, and timeless fashion.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Our Journey */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{xs:12,md:6}}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Chip
                icon={<History />}
                label="Since 2010"
                sx={{ mb: 3, backgroundColor: 'primary.light', color: 'primary.contrastText' }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                From Humble Beginnings
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Farhan's Store began as a small boutique in Karachi, founded by Farhan Ahmed with 
                a vision to bring premium Pakistani fashion to the world. What started with just 
                five employees and a passion for traditional craftsmanship has grown into a 
                beloved brand known for its exquisite designs and uncompromising quality.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Today, we serve thousands of customers across Pakistan and internationally, 
                staying true to our roots while embracing innovation in fashion.
              </Typography>
            </motion.div>
          </Grid>
          <Grid size={{xs:12,md:6}}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80"
                alt="Our Journey"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: 8,
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Our Values */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Our Values
            </Typography>
            <Typography variant="h6" color="text.secondary">
              The principles that guide everything we do
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid  size={{xs:12,sm:6,md:3}} key={value.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      backgroundColor: 'white',
                      borderRadius: 3,
                      textAlign: 'center',
                      p: 3,
                      '&:hover': {
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      {React.cloneElement(value.icon, { sx: { fontSize: 30, color: 'primary.contrastText' } })}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Playfair Display", serif' }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Mission */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{xs:12,md:6}} sx={{ order: { xs: 2, md: 1 } }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
                alt="Our Mission"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: 8,
                }}
              />
            </motion.div>
          </Grid>
          <Grid size={{xs:12,md:6}} sx={{ order: { xs: 1, md: 2 } }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Chip
                icon={<Flag />}
                label="Our Vision"
                sx={{ mb: 3, backgroundColor: 'secondary.light', color: 'secondary.contrastText' }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Redefining Pakistani Fashion
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Our mission is to make premium Pakistani fashion accessible to everyone, 
                without compromising on quality or authenticity. We believe that fashion 
                should celebrate culture while embracing modernity.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Through sustainable practices, ethical production, and a commitment to 
                customer satisfaction, we aim to set new standards in the fashion industry.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Meet Our Team */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Meet Our Team
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              The passionate people behind Farhan's Store
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid  size={{xs:12,sm:6,md:3}} key={member.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      backgroundColor: 'white',
                      borderRadius: 3,
                      textAlign: 'center',
                      p: 3,
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-8px)',
                        transition: 'all 0.3s ease',
                      },
                    }}
                  >
                    <Avatar
                      src={member.image}
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        border: '4px solid',
                        borderColor: 'primary.light',
                      }}
                    />
                    <Typography variant="h6" sx={{ mb: 1, fontFamily: '"Playfair Display", serif' }}>
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      size="small"
                      color="primary"
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid  size={{xs:6,md:3}}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" fontWeight="bold">
                5000+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Happy Customers
              </Typography>
            </Box>
          </Grid>
          <Grid  size={{xs:6,md:3}}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" fontWeight="bold">
                14
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Years of Excellence
              </Typography>
            </Box>
          </Grid>
          <Grid  size={{xs:6,md:3}}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" fontWeight="bold">
                1000+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Unique Designs
              </Typography>
            </Box>
          </Grid>
          <Grid  size={{xs:6,md:3}}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" fontWeight="bold">
                24/7
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Customer Support
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

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
            Join Our Fashion Journey
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Experience the perfect blend of tradition and modernity with Farhan's Store
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={RouterLink}
              to="/products"
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
              Shop Now
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
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
              Contact Us
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;