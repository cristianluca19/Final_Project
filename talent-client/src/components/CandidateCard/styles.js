import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
      maxHeigth: 300,
    },
    media: {
      height: "100%",
      width: "100%",
      borderRight: '5px black',
    },
    spacingBot: {
      borderBottom: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    }
  }));

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow['A200'],
    },
    secondary: {
      main: '#000',
    },
  },
});
