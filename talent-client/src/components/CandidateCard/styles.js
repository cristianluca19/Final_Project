import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { yellow, blueGrey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 550,
      maxHeigth: 300,
      borderStyle: 'solid',
      borderColor: "#111",
      border: 2,
      boxShadow: "4px 4px 24px -6px #999",
      '&:hover': {
        boxShadow: "1px 2px 8px 1px #000000",
      }
    },
    media: {
      height: "100%",
      width: "100%",
      borderRight: '5px black',
    },
    chips: {
      borderRadius: 50,
      maxHeight: 5,
      marginTop: 10,
      marginRight: 20,
      fontSize: 14,
      '&:hover': {
        backgroundColor: yellow["A500"],
        fontWeight:1000,
      }
    },
    contactButton: {
      maxHeight: 20,
      marginBottom: -20,
      border: 1,
      borderStyle: "solid",
    },
    contactButtonView: {
      display: "none"
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
