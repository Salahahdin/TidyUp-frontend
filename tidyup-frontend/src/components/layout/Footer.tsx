import { Box, Typography, Stack } from '@mui/material';
import { CleaningServices, Favorite } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        background: 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.03) 100%)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        <CleaningServices sx={{ fontSize: 18, color: '#6366f1' }} />
        <Typography variant="body2" color="text.secondary">
           TidyUp © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          •
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          Made with <Favorite sx={{ fontSize: 14, color: '#ec4899' }} /> for clean homes by Webrys
        </Typography>
      </Stack>
    </Box>
  );
}
