import { Box, Typography } from '@mui/material';
import type { Task } from '../../types/task';
import TaskCard from './TaskCard';

type Props = {
  tasks: Task[];
  onToggleDone: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskList({ tasks, onToggleDone, onEdit, onDelete }: Props) {
  if (!tasks.length) {
    return <Typography color="text.secondary">No tasks yet. Add your first cleaning task.</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 2,
      }}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggleDone={onToggleDone} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Box>
  );
}
