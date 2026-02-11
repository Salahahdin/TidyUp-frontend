import { useState } from 'react';
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Divider, Stack, TextField, Typography } from '@mui/material';
import { Person, Email, Badge, Save } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { updateMe } from '../../api/userApi';

export default function ProfilePage() {
  const { user, refreshMe } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('saving');
    try {
      await updateMe({ name: name.trim() || undefined, email: email.trim() || undefined });
      await refreshMe();
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
          borderRadius: 4,
          p: 4,
          mb: 3,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            mb: 2,
            fontSize: 40,
            fontWeight: 700,
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '4px solid rgba(255,255,255,0.3)',
          }}
        >
          {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {user?.name || 'User'}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
          {user?.email}
        </Typography>
        <Chip
          label={user?.role === 'ADMIN' ? 'Admin' : 'User'}
          sx={{
            mt: 2,
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Form */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Edit profile
          </Typography>

          {status === 'success' && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
              Profile has been updated!
            </Alert>
          )}
          {status === 'error' && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              Failed to update profile.
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="name and surname"
                value={name}
                onChange={(event) => setName(event.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />

              <Divider />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Badge sx={{ color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user?.role === 'ADMIN' ? 'Admin' : 'User'}
                  </Typography>
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                disabled={status === 'saving'}
                startIcon={<Save />}
                sx={{
                  py: 1.5,
                  mt: 2,
                }}
              >
                {status === 'saving' ? 'Saving...' : 'Save changes'}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
