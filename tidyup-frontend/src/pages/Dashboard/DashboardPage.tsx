import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Add, CheckCircle, Schedule, Assignment } from '@mui/icons-material';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import type { Task, TaskInput, TaskUpdateInput } from '../../types/task';
import { createTask, deleteTask, getTasks, toggleTaskDone, updateTask } from '../../api/taskApi';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const doneCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const pendingCount = useMemo(() => tasks.filter((task) => !task.done).length, [tasks]);
  const progress = tasks.length > 0 ? (doneCount / tasks.length) * 100 : 0;

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Could not load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTasks();
  }, []);

  const handleCreate = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSubmit = async (payload: TaskInput | TaskUpdateInput) => {
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask.id, payload);
        setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
      } else {
        const created = await createTask(payload as TaskInput);
        setTasks((prev) => [created, ...prev]);
      }
      setDialogOpen(false);
    } catch (err) {
      setError('Saving task failed.');
    }
  };

  const handleToggle = async (task: Task) => {
    try {
      const updated = await toggleTaskDone(task.id, !task.done);
      setTasks((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setError('Updating task failed.');
    }
  };

  const handleDelete = async (task: Task) => {
    try {
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((item) => item.id !== task.id));
    } catch (err) {
      setError('Deleting task failed.');
    }
  };

  const StatCard = ({
    title,
    value,
    icon,
    gradient,
  }: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    gradient: string;
  }) => (
    <Card sx={{ flex: 1, minWidth: 200 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: gradient,
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
          borderRadius: 4,
          p: 4,
          color: 'white',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} spacing={2}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              My tasks 🧹
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>
              Keep your home clean and organized
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreate}
            sx={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              px: 3,
              py: 1.5,
              '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            New task
          </Button>
        </Stack>

        {/* Progress bar */}
        <Box sx={{ mt: 3 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Progress: {doneCount} from {tasks.length} tasks done
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {Math.round(progress)}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.2)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
              },
            }}
          />
        </Box>
      </Box>

      {/* Stats */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <StatCard
          title="All tasks"
          value={tasks.length}
          icon={<Assignment />}
          gradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
        />
        <StatCard
          title="To do"
          value={pendingCount}
          icon={<Schedule />}
          gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
        />
        <StatCard
          title="Finished"
          value={doneCount}
          icon={<CheckCircle />}
          gradient="linear-gradient(135deg, #10b981 0%, #34d399 100%)"
        />
      </Stack>

      {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}

      {/* Task list */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Task list
        </Typography>
        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">Loading tasks...</Typography>
          </Box>
        ) : (
          <TaskList tasks={tasks} onToggleDone={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 4 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingTask ? 'Edit task' : 'New task'}
        </DialogTitle>
        <DialogContent>
          <TaskForm
            task={editingTask}
            onCancel={() => setDialogOpen(false)}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
