import React from 'react';
import { Grid, Container, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
  copyright: {
    color: 'white',
    padding: '28px',
  },
  containerFooter: {
    justifyContent: 'center',
  },
});

function Catalogue() {
  const classes = useStyle();

  return (
    <nav>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Grid>
      </Container>
    </nav>
  );
}

export default Catalogue;
