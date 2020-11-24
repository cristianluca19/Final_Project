import PropTypes from 'prop-types';
import { Container, Grid, Typography, ThemeProvider } from '@material-ui/core';
import { henryTheme } from '../../henryMuiTheme';
import CandidateCard from '../CandidateCard';
import { useStyles } from './styles.js';
import { useSelector } from 'react-redux';
import Paginator from '../Paginator';
import React, { useState } from 'react';
import axios from 'axios';
import ActiveFolder from '../ActiveFolder/ActiveFolder';
import Notification from '../RecruiterCreate/notification';
import Swal from 'sweetalert2';

function CardsContainer(props) {
  const classes = useStyles();

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  // === FETCH ALL CANDIDATES (SHOULD BE "VISIBLE only...") FROM STORE  ====
  const candidates = useSelector(
    (store) => store.CandidateReducer.allCandidates
  );
  const folder = useSelector((store) => store.FolderReducer.activeFolder);  //Antes estaba newFolder
  
  const cardsMaxLimit = 30;

  const handleCandidate = (event, candidate, folder, uuid, includes) => {
    event.preventDefault();
    if (!uuid) {
      if (!includes) {
        AddCandidateToFolder(
          candidate,
          folder,
          selectedCandidates,
          setSelectedCandidates,
          setNotify
        );
      } else {
        RemoveCandidateFromFolder(
          candidate,
          folder,
          selectedCandidates,
          setSelectedCandidates,
          setNotify
        );
      }
    } else {
      // TODO: Add functionality to contact candidate (mailto:)
      return;
    }
  };

  const includesCandidate = (id) => {
    return selectedCandidates.includes(id);
  };

  if (!candidates.length) return <h1>Loading...</h1>;

  return (
    <Container className={classes.container} maxWidth="xl">
      <div style={{backgroundColor: 'white'}}><ActiveFolder /></div>
      {folder && (
        <ThemeProvider theme={henryTheme}>
          <Typography color="primary">
            {`Carpeta N°: ${folder.id} - ${
              folder.company ? `${folder.contactName} - ${folder.company}` : ' '
            }`}
          </Typography>
        </ThemeProvider>
      )}
      <Grid
        className={classes.paddingCandidates}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
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
                    folder={folder}
                    location={props.location}
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
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
}

CardsContainer.propTypes = {
  users: PropTypes.array.isRequired,
};

CardsContainer.defaultProps = {
  users: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
};

const AddCandidateToFolder = (candidate, folder, hook, setHook, setNotify) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/candidates/${
        folder ? folder.id : 1
      }/addCandidate/${candidate}`
    )
    .then((response) => {
      setHook([...hook, candidate]);
      AlertCandidate.fire({
        icon: 'success',
        title: 'Candidato agregado...',
      });
      return;
    })
    .catch((error) => {
      setNotify({
        isOpen: true,
        message: 'Oops... ocurrió un error',
        type: 'error',
      });
      return;
    });
};

const RemoveCandidateFromFolder = (
  candidate,
  folder,
  hook,
  setHook,
  setNotify
) => {
  axios
    .delete(
      `${process.env.REACT_APP_BACKEND_URL}/candidates/${
        folder ? folder.id : 1
      }/removeCandidate/${candidate}`
    )
    .then((response) => {
      let newSelectedCandidates = hook.filter(
        (eachCandidate) => eachCandidate !== candidate
      );
      setHook(newSelectedCandidates);
      AlertCandidate.fire({
        icon: 'error',
        title: 'Candidato removido...',
      });
      return;
    })
    .catch((error) => {
      setNotify({
        isOpen: true,
        message: 'Oops... ocurrió un error',
        type: 'error',
      });
      return;
    });
};

const AlertCandidate = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

export default CardsContainer;
