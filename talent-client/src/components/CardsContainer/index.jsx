import PropTypes from 'prop-types';
import { Container, Grid, Typography, ThemeProvider } from '@material-ui/core';
import { henryTheme } from '../../henryMuiTheme';
import CandidateCard from '../CandidateCard';
import { useStyles } from './styles.js';
import { useSelector, useDispatch } from 'react-redux';
import Paginator from '../Paginator';
import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../RecruiterCreate/notification';
import Swal from 'sweetalert2';
import { newFolder, getFolderById } from '../../redux/foldersReducer/Action.js';

function CardsContainer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

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
  const { folder } = useSelector((store) => store.FolderReducer.newFolder);

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

// const noActiveFolder = (dispatch) => {
//   Swal.fire({
//     title: 'No tienes niguna carpeta activa, quieres crearla?',
//     showDenyButton: true,
//     confirmButtonText: `Crear`,
//     denyButtonText: `Cancelar`,
//   }).then((result) => {
//     if (result.isConfirmed) {
//       axios.post(`${process.env.REACT_APP_BACKEND_URL}/folders`)
//         .then((response) => {
//           dispatch(newFolder(response.data));
//           localStorage.setItem('activeFolderId', response.data.folder.id)
//           Swal.fire('Carpeta Creada!', `id: ${response.data.folder.id} - ${response.data.folder.uuid}`, 'success')
//         })
//     } else if (result.isDenied) {
//       return
//     }
//   })
// }

export default CardsContainer;
