import { makeStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) => ({
  contentSearch: {
    width: '110%',
    margin: 0,
    padding: '30px 0px',
  },
  selectStyle: {
    width: '250px',
    height: '60px',
    padding: '0px 32px 0px 0px',
    '&:hover': {
      background: '#f5f5f5',
    },
    marginLeft: '34px',
  },
  inputLabel: {
    color: '#222222 !important',
    paddingLeft: 10,
    '&$focused': {
      background: '#ffda00',
      color: '#000000 !important',
    },
  },
  formControl: {
    margin: theme.spacing(1, 7, 1, 1),
    minWidth: 250,
    maxWidth: 250,
    textAlign: 'left',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  button: {
    top: 15,
    height: 50,
    width: 207,
    marginLeft: 15,
    backgroundColor: 'black',
    color: 'yellow',
    '&:hover': {
      background: '#222222',
    },
  },
  inputSelectData: {
    background: '#8c8c8c17',
    paddingLeft: 8,
    boxShadow: '8px 7px 8px -3px rgba(0,0,0,0.35)',
  },
  formSelectFilter: {
    float: 'left',
  },
}));
