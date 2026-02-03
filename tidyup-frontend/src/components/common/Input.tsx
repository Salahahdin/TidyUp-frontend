import TextField, { type TextFieldProps } from '@mui/material/TextField';

export default function Input(props: TextFieldProps) {
  return <TextField fullWidth margin="normal" {...props} />;
}
