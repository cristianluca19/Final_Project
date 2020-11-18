import PropTypes from 'prop-types';
import { Container, Grid } from '@material-ui/core';
import CandidateCard from '../CandidateCard';
import { useStyles } from './styles.js';
import { useSelector } from 'react-redux';
import Paginator from '../Paginator';
import React, { useState } from 'react';
import axios from 'axios';

function CardsContainer(props) {
  const classes = useStyles();

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  // === FETCH ALL CANDIDATES (SHOULD BE "VISIBLE only...") FROM STORE  ====
  const candidates = useSelector(
    (store) => store.CandidateReducer.allCandidates
  );
  const { folder } = useSelector((store) => store.FolderReducer.newFolder);

  const cardsMaxLimit = 30;

  const handleCandidate = (event, candidate, uuid, includes) => {
    event.preventDefault();
    if (!uuid) {
      if (!includes) {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/candidates/${
              folder ? folder.id : 1
            }/addCandidate/${candidate}`
          )
          .then((response) => {
            setSelectedCandidates([...selectedCandidates, candidate]);
            return;
          })
          .catch((error) => {
            console.log(error.message);
            return;
          });
      } else {
        axios
          .delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/candidates/${
              folder ? folder.id : 1
            }/removeCandidate/${candidate}`
          )
          .then((response) => {
            let newSelectedCandidates = selectedCandidates.filter(
              (eachCandidate) => eachCandidate !== candidate
            );
            setSelectedCandidates(newSelectedCandidates);
            return;
          })
          .catch((error) => {
            console.log(error.message);
            return;
          });
      }
    } else {
      // TODO: Add functionality to contact candidate (mailto:)
      return;
    }
  };

  const includesCandidate = (id) => {
    return selectedCandidates.includes(id);
  };

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
              candidate.visibility === 'listed' && (
                <div key={index} className={classes.CandidateCard}>
                  <CandidateCard
                    candidate={candidate}
                    handleCandidate={handleCandidate}
                    includes={includesCandidate(candidate.id)}
                  />
                </div>
              )
          )}
      </Grid>
      {candidates.length && (
        <Grid>
          <Paginator />
        </Grid>
      )}
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
