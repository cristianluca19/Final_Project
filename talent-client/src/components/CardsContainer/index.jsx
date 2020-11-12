import PropTypes from 'prop-types';
import { Container, Grid } from '@material-ui/core';
import CandidateCard from '../CandidateCard';
import { useStyles } from './styles.js';
import { useSelector } from 'react-redux';
import React from 'react';

function CardsContainer(props) {
  const classes = useStyles();

  // === FETCH ALL CANDIDATES (SHOULD BE "VISIBLE only...") FROM STORE  ====
  const candidates = useSelector(
    (store) => store.CandidateReducer.allCandidates
  );

  const cardsMaxLimit = 30;

  // CONSIDER IMPLENTING A LOADING COMPONENT HERE WHILE FETCH RESOLVES....

  return (
    <Container className={classes.container} maxWidth="xl">
      <Grid
        className={classes.paddingCandidates}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {/* props.user.map((candidate,index) */}{' '}
        {/* to test change line below for this line and remove user prop in CandidateCard (line28)*/}
        {candidates &&
          candidates.map(
            (candidate, index) =>
              index < cardsMaxLimit &&
              candidate.visibility == 'listed' && (
                <div key={index} className={classes.CandidateCard}>
                  <CandidateCard user={candidate} />
                </div>
              )
          )}
      </Grid>
    </Container>
  );
}

CardsContainer.propTypes = {
  users: PropTypes.array.isRequired,
};

CardsContainer.defaultProps = {
  users: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
};

export default CardsContainer;
