import React from 'react';
import { Grid, Container, makeStyles } from '@material-ui/core';
import Search from './search.jsx';
import bgHenry from '../../images/bg-henry-content.png';

const useStyle = makeStyles({
  contentSearch: {
    padding: '20px 90px 20px 80px',
    minHeight: '250px',
  },
  contentSearchFluid: {
    backgroundColor: '#ffff00',
    backgroundImage: `url(${bgHenry})`,
    backgroundSize: 'cover',
  },
  textLeftSearch: {
    padding: '10px 61px',
    textAlign: 'left',
    fontSize: '30px !important',
    border: '5px solid #000000',
    margin: '40px 0px',
  },
});

function ContentHome() {
  const classes = useStyle();

  return (
    <div className={classes.contentSearchFluid}>
      <Container className={classes.contentSearch} maxWidth="lg">
        <Grid container spacing={1}>
          <Grid container item xs={12} sm={8} spacing={3}>
            <div className={classes.textLeftSearch}>
              <h2>
                Henry Talent helps you find the best profiles for your company.
              </h2>
            </div>
          </Grid>
          <Grid container item xs={12} sm={4} spacing={3}>
            <Search />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default ContentHome;
