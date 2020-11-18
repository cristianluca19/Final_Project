import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      maxWidth: 600,
      marginBottom: 20,
    },
    '& .MuiInputBase-input': {
      color: '#FFFFFF',
    },
    '& .MuiFormControl-root': {
      margin: theme.spacing(2),
    }
  },
  submitbtn: {
    maxWidth: 600,
    marginBottom: theme.spacing(2),
    '&:hover': {
      color: '#111111',
      backgroundColor: '#FFF001',
    },
  },
}));
