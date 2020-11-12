import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
// import { yellow } from '@material-ui/core/colors';


export const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(3),
    }
  }
}));

export const henryTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFF01",
      light: "#FFFFFF",
      dark: "#000000",
      contrastText: {
        color: "#000000",
      }
    },
    secondary: {
      main: '#AEADB3',
      light: '#D2D2D6',
      dark: '#87868A',
    },
  }
});

henryTheme.overrides = {
  MuiPaginationItem: {
    page: {
      backgroundColor: "#FFFF01",
      color: "#000000",
      "&:hover": {
        color: "#FFFF01"
      }
    },
    root: {
      fontWeight: 600,
      color: "#FFFFFF", // provides white color to '...'
      '&$selected': {
        color: '#FFFFFF !important', // provides this color to text in selected button
        backgroundColor: '#000000 !important'
      }
    },
  }
}

henryTheme.props = {
}