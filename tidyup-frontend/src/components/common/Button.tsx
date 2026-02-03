import MuiButton, { type ButtonProps } from '@mui/material/Button';

export default function Button(props: ButtonProps) {
  return <MuiButton variant={props.variant ?? 'contained'} {...props} />;
}
