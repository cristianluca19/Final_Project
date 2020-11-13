import React from 'react';
import './style.css';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

const useStyle = makeStyles((theme) => ({
  contentSearch: {
    background: '#000000',
    width: '480px',
    margin: '55px 0px 55px 0px',
    padding: '30px 0px',
    border: '5px solid #000000',
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
  inputLabelSearch: {
    color: '#ffff00',
    paddingLeft: 10,
    '&$focused': {
      background: '#ffda00',
      color: '#ffff00',
    },
  },
  button: {
    backgroundColor: '#ffff00',
    width: '78%',
    color: '#000000',
    '&:hover': {
      background: '#ffda00',
    },
    button: {
        backgroundColor: '#ffff00',
        width: '78%',
        color: '#000000',
        "&:hover": {
            background: '#ffda00'
        }
    },
    formControl: {
        minWidth: 120,
        margin: '0px 8px'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    selectInput: {
        backgroundColor: '#ffffff1f',
        paddingRight: '24px',
        width: '280px'
    }
}}));

function Search() {
  const classes = useStyle();
  //Location - Features - Skills
  return (
    <div className={classes.contentSearch}>
      <FormControl className={classes.formControl}>
        <InputLabel
          className={classes.inputLabelSearch}
          htmlFor="age-native-simple"
        >
          Location
        </InputLabel>
        <Select native className={classes.selectInput}>
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel
          className={classes.inputLabelSearch}
          htmlFor="age-native-simple"
        >
          Features
        </InputLabel>
        <Select native className={classes.selectInput}>
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel
          className={classes.inputLabelSearch}
          htmlFor="age-native-simple"
        >
          Skills
        </InputLabel>
        <Select native className={classes.selectInput}>
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
      <br />
      <br />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<SearchIcon />}
      >
        Select Candidates
      </Button>
    </div>
  );
}

export default Search;
