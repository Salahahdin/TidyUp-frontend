import { Box, Card, CardContent, CardActions, Typography, Chip, Stack, IconButton, Checkbox } from '@mui/material';
import { Edit, Delete, LocationOn, CalendarToday, Flag } from '@mui/icons-material';
import type { Task } from '../../types/task';

type Props = {
  task: Task;
  onToggleDone: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const priorityColors: Record<string, { bg: string; text: string }> = {
  HIGH: { bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626' },
  MEDIUM: { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706' },
  LOW: { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669' },
};

export default function TaskCard({ task, onToggleDone, onEdit, onDelete }: Props) {
  const priorityStyle = task.priority ? priorityColors[task.priority] : priorityColors.MEDIUM;

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s ease',
        opacity: task.done ? 0.7 : 1,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        },
        '&::before': task.done
          ? {}
          : {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: 4,
              height: '100%',
              borderRadius: '16px 0 0 16px',
              background:
                task.priority === 'HIGH'
                  ? 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)'
                  : task.priority === 'MEDIUM'
                  ? 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)'
                  : 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
            },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* Checkbox */}
          <Checkbox
            checked={task.done}
            onChange={() => onToggleDone(task)}
            sx={{
              mt: -0.5,
              color: '#cbd5e1',
              '&.Mui-checked': {
                color: '#10b981',
              },
            }}
          />

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1.1rem',
                textDecoration: task.done ? 'line-through' : 'none',
                color: task.done ? 'text.secondary' : 'text.primary',
              }}
            >
              {task.title}
            </Typography>

            {task.description && (
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  color: 'text.secondary',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {task.description}
              </Typography>
            )}

            {/* Tags */}
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
              {task.priority && (
                <Chip
                  icon={<Flag sx={{ fontSize: 14 }} />}
                  size="small"
                  label={task.priority === 'HIGH' ? 'High' : task.priority === 'MEDIUM' ? 'Medium' : 'Low'}
                  sx={{
                    background: priorityStyle.bg,
                    color: priorityStyle.text,
                    fontWeight: 500,
                    '& .MuiChip-icon': { color: priorityStyle.text },
                  }}
                />
              )}
              {task.location && (
                <Chip
                  icon={<LocationOn sx={{ fontSize: 14 }} />}
                  size="small"
                  label={task.location}
                  sx={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    color: '#6366f1',
                    fontWeight: 500,
                    '& .MuiChip-icon': { color: '#6366f1' },
                  }}
                />
              )}
              {task.dueDate && (
                <Chip
                  icon={<CalendarToday sx={{ fontSize: 14 }} />}
                  size="small"
                  label={task.dueDate}
                  sx={{
                    background: 'rgba(100, 116, 139, 0.1)',
                    color: '#64748b',
                    fontWeight: 500,
                    '& .MuiChip-icon': { color: '#64748b' },
                  }}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', pt: 0, px: 2, pb: 1.5 }}>
        <IconButton
          size="small"
          onClick={() => onEdit(task)}
          sx={{
            color: '#64748b',
            '&:hover': { color: '#6366f1', background: 'rgba(99, 102, 241, 0.1)' },
          }}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => onDelete(task)}
          sx={{
            color: '#64748b',
            '&:hover': { color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' },
          }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
