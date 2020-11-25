import PropTypes from 'prop-types';
import { Container, Grid, Typography, ThemeProvider } from '@material-ui/core';
import { henryTheme } from '../../henryMuiTheme';
import CandidateCard from '../CandidateCard';
import { useStyles } from './styles.js';
import { useSelector, useDispatch } from 'react-redux';
import Paginator from '../Paginator';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActiveFolder from '../ActiveFolder/ActiveFolder';
import Notification from '../RecruiterCreate/notification';
import Swal from 'sweetalert2';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCandidatesPage } from '../../redux/candidatesReducer/Action.js';
import { setActiveFolder } from '../../redux/foldersReducer/Action.js';

function CardsContainer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [newPageSelected, setNewPageSelected] = useState(false);

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  // === FETCH ALL CANDIDATES (SHOULD BE "VISIBLE only...") FROM STORE  ====
  const candidates = useSelector(
    (store) => store.CandidateReducer.pagedCandidates
  );
  const pageData = useSelector((store) => store.CandidateReducer.pageStats);
  const folder = useSelector((store) => store.FolderReducer.activeFolder);
  const recruiterData = useSelector(
    (store) => store.FolderReducer.dossier.recruiter
  );
  

  useEffect(() => {
    dispatch(getCandidatesPage(currentPage));
  }, [newPageSelected]);

  const cardsMaxLimit = 30;

  const handleCandidate = async (event, candidate, folder, uuid, includes) => {
    event.preventDefault();
    console.log('folder :', folder)
    if (!folder) {
      folder = await createDraftFolder();
      dispatch(setActiveFolder(folder.id));
      console.log(folder);
    }
    if (!uuid) {
      if (!includes) {
        AddCandidateToFolder(
          candidate,
          folder,
          selectedCandidates,
          setSelectedCandidates,
          setNotify,
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
  if (!candidates.length) {
    return (
      <ThemeProvider theme={henryTheme}>
        <CircularProgress
          color="primary"
          style={{ marginTop: 100, marginBottom: 100 }}
          size={80}
        />
      </ThemeProvider>
    );
  }

  return (
    <Container className={classes.container} maxWidth="xl">
      <div><ActiveFolder /></div>
      {folder && (
        <ThemeProvider theme={henryTheme}>
          <Typography color="primary">
            {`Carpeta N°: ${folder.id} - ${
              recruiterData && recruiterData.company ? `${recruiterData.contactName} - ${recruiterData.company}` : ' '
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
      {pageData.totalPages && (
        <Grid>
          <Paginator
            maxPages={pageData.totalPages}
            current={currentPage}
            setCurrentPage={setCurrentPage}
            setPager={setNewPageSelected}
            newPage={newPageSelected}
          />
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

const createDraftFolder = async () => {
  try {
    const newFolder = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/folders`)
    AlertCandidate.fire({
      icon: 'info',
      title: 'Nueva carpeta creada...',
    });
    return newFolder.data.folder
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

const AddCandidateToFolder = (candidate, folder, hook, setHook, setNotify) => {
  axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/candidates/${folder.id}/addCandidate/${candidate}`
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
      `${process.env.REACT_APP_BACKEND_URL}/candidates/${folder.id}/removeCandidate/${candidate}`
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
