import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { AdminPanelSettings, Person, SupervisorAccount } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import type { User, UserRole } from '../../types/user';
import { listUsers, updateUser } from '../../api/userApi';

const roles: UserRole[] = ['ADMIN', 'USER'];

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listUsers();
      setUsers(data);
    } catch (err) {
      setError('Could not load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleRoleChange = async (user: User, role: UserRole) => {
    try {
      const updated = await updateUser(user.id, { role });
      setUsers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setError('Updating role failed.');
    }
  };

  const handleActiveChange = async (user: User, active: boolean) => {
    try {
      const updated = await updateUser(user.id, { active });
      setUsers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setError('Updating user failed.');
    }
  };

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #fb7185 100%)',
          borderRadius: 4,
          p: 4,
          color: 'white',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <AdminPanelSettings sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Panel Administratora
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Zarządzaj użytkownikami i ich uprawnieniami
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Stats */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                <SupervisorAccount />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {users.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Wszyscy użytkownicy
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }}>
                <Person />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {users.filter((u) => u.active !== false).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Aktywni
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }}>
                <AdminPanelSettings />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {users.filter((u) => u.role === 'ADMIN').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Administratorzy
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

      {/* User list */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Lista użytkowników
        </Typography>

        {loading ? (
          <Typography color="text.secondary">Ładowanie użytkowników...</Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {users.map((user) => (
              <Card
                key={user.id}
                sx={{
                  opacity: user.active === false ? 0.6 : 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    {/* User info */}
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                          background:
                            user.role === 'ADMIN'
                              ? 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
                              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          fontWeight: 600,
                        }}
                      >
                        {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                          {user.name || 'Bez nazwy'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {user.email}
                        </Typography>
                      </Box>
                      <Chip
                        size="small"
                        label={user.active !== false ? 'Aktywny' : 'Zablokowany'}
                        sx={{
                          background: user.active !== false ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: user.active !== false ? '#059669' : '#dc2626',
                          fontWeight: 500,
                        }}
                      />
                    </Stack>

                    {/* Controls */}
                    <Stack direction="row" spacing={2} alignItems="center">
                      <FormControl size="small" sx={{ flex: 1 }}>
                        <InputLabel>Rola</InputLabel>
                        <Select
                          label="Rola"
                          value={user.role}
                          onChange={(event) => handleRoleChange(user, event.target.value as UserRole)}
                        >
                          {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                              {role === 'ADMIN' ? 'Administrator' : 'Użytkownik'}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          Aktywny
                        </Typography>
                        <Switch
                          checked={user.active !== false}
                          onChange={(event) => handleActiveChange(user, event.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#10b981',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#10b981',
                            },
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
}
