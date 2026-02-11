import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import type { Task, TaskInput, TaskPriority, TaskUpdateInput } from '../../types/task';

const priorities: TaskPriority[] = ['', 'LOW', 'MEDIUM', 'HIGH'];

type Props = {
  task?: Task | null;
  onCancel: () => void;
  onSubmit: (payload: TaskInput | TaskUpdateInput) => void;
};

const emptyState: TaskInput = {
  title: '',
  description: '',
  dueDate: '',
  priority: '',
  location: '',
};

export default function TaskForm({ task, onCancel, onSubmit }: Props) {
  const [form, setForm] = useState<TaskInput>(emptyState);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description ?? '',
        dueDate: task.dueDate ?? '',
        priority: task.priority ?? 'MEDIUM',
        location: task.location ?? '',
      });
    } else {
      setForm(emptyState);
    }
  }, [task]);

  const handleChange = (field: keyof TaskInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      title: form.title.trim(),
      description: form.description?.trim() || undefined,
      dueDate: form.dueDate || undefined,
      priority: form.priority,
      location: form.location?.trim() || undefined,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={form.title}
          onChange={(event) => handleChange('title', event.target.value)}
          required
        />
        <TextField
          label="Description"
          value={form.description}
          onChange={(event) => handleChange('description', event.target.value)}
          multiline
          minRows={3}
        />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            label="Due date"
            type="date"
            value={form.dueDate}
            onChange={(event) => handleChange('dueDate', event.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              label="Priority"
              value={form.priority}
              onChange={(event) => handleChange('priority', event.target.value)}
            >
              {priorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority === '' ? 'None' : priority}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Location"
            value={form.location}
            onChange={(event) => handleChange('location', event.target.value)}
            fullWidth
          />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">Save task</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
