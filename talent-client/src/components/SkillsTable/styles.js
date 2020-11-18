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
    width: '10vw',
    backgroundColor: 'snow'
  },
  iconContainer: {
    alignSelf: 'center',
  }
}));