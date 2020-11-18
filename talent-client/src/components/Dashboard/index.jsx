import React from 'react';
import Menu from './menu';
import Candidates from './candidates';
import { useStyle } from './Styles/index.css.js';
import { Container, Grid } from '@material-ui/core';

function Dashboard({ componentToRender }) {
  const classes = useStyle();

  return (
    <div className={classes.dashboardMain}>
      <Grid container item xs={2} sm={2} spacing={1} className={classes.menu}>
        <Menu />
      </Grid>
      <Grid
        container
        item
        xs={10}
        sm={10}
        spacing={1}
        className={classes.containerRight}
      >
        {componentToRender === 'candidates' && <Candidates />}
      </Grid>
    </div>
  );
}

export default Dashboard;
