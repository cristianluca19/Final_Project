import { makeStyles } from '@material-ui/core';

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

export const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: 'black',
    color: 'white',
  },
  searchBar: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  yellowButton: {
    color: 'black',
    backgroundColor: 'yellow',
    height: '35px',
    borderRadius: '4px',
    border: 'none',
    margin: '10px',
  },
  blackButton: {
    color: 'yellow',
    backgroundColor: 'black',
    height: '35px',
    borderRadius: '4px',
    margin: '10px',
    // border: 1px yellow solid,
  },
  checkIcon: {
    fontSize: '1px',
  },
  divSkillsSelected: {
    marginBottom: '100px',
  },
  divAllSkills: {
    marginTop: '50px',
  },
  generalDiv: {
    marginBottom: '40px',
  },
  inputLabel: {
    marginBottom: '100px',
  },
  input: {
    marginTop: '10px',
    color: 'white',
  },
}));
