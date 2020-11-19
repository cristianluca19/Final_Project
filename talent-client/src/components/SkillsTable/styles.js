import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#ebebeb',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-around',
  },
  list: {
    width: '17vw',
    height: 'min-content',
    marginTop: '10vh'
  },
  title: {
    textAlign: 'left'
  },
  listItems: {
    backgroundColor: '#FFFAFA'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  text: {
    marginLeft: '0.5vw',
    fontSize: '18px'
  },
  icon: {
    marginRight: '0.5vw',
    cursor: 'pointer',
  },
  modal: {
    width: '20vw',
    backgroundColor: 'snow',
    margin: 'auto',
    marginTop: '30vh',
    padding: '20px',
  },
  iconContainer: {
    alignSelf: 'center',
  },
  label: {
    margin: '0 1vw 1vh 0'
  },
  input: {
    marginBottom: '1vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    padding: '0.25vw',
    width: 'min-content',
    margin: 'auto',
    marginTop: '1vh'
  },
}));