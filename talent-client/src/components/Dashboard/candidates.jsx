import React from 'react';
import { useStyle } from './Styles/candidates.css.js';

function Candidates() {
  const classes = useStyle();

  return <div className={classes.candidatesContent}></div>;
}

export default Candidates;
