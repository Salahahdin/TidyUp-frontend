import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
