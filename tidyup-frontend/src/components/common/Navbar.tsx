import { AppBar, Avatar, Box, Button, Chip, IconButton, Toolbar, Typography } from '@mui/material';
import { CleaningServices, Dashboard, Logout, Person, AdminPanelSettings } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    borderRadius: 12,
    textDecoration: 'none',
    color: isActive ? '#6366f1' : '#64748b',
    background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
    fontWeight: isActive ? 600 : 500,
    transition: 'all 0.2s ease',
  });

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}
      elevation={0}
    >
      <Toolbar sx={{ gap: 2, py: 1 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 4 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            }}
          >
            <CleaningServices sx={{ fontSize: 22 }} />
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TidyUp
          </Typography>
        </Box>

        {isAuthenticated ? (
          <>
            {/* Navigation Links */}
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              <NavLink to="/dashboard" style={navLinkStyle}>
                <Dashboard sx={{ fontSize: 20 }} />
                Dashboard
              </NavLink>
              <NavLink to="/profile" style={navLinkStyle}>
                <Person sx={{ fontSize: 20 }} />
                Profil
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin" style={navLinkStyle}>
                  <AdminPanelSettings sx={{ fontSize: 20 }} />
                  Admin
                </NavLink>
              )}
            </Box>

            {/* User info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                avatar={
                  <Avatar sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </Avatar>
                }
                label={user?.name || user?.email}
                variant="outlined"
                sx={{ borderRadius: 20, px: 1 }}
              />
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: '#64748b',
                  '&:hover': { color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' },
                }}
              >
                <Logout />
              </IconButton>
            </Box>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{ ml: 'auto' }}
          >
            Zaloguj się
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
