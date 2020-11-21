import React from 'react';
import { Container, Grid } from '@material-ui/core';
import CandidateCard from '../CandidateCard';
import { useSelector } from 'react-redux';
import Paginator from '../Paginator';
import { useStyles } from './styles.js';
import { useDispatch } from 'react-redux';
import { getAllFolders } from '../../redux/foldersReducer/Action';
import { removeCandidateFromFolder } from '../../redux/candidatesReducer/Action';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function Folder(props) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [idCandidate, setIdCandidate] = React.useState(0);
  const DEFAULT_ROWS_PER_PAGE = 30;
  const classes = useStyles();
  const dispatch = useDispatch();
  const folders = useSelector((store) => store.FolderReducer.allFolders);
  const path = window.location.pathname.split('/folder/');
  const findFolder = folders.find((folder) => folder.uuid === path[1]);
  const DELETE_CLICK_ACTION = 'delete';

  let folderObject = {};
  if (folders.length) {
    folderObject = {
      candidates: findFolder.candidates,
      selector: `${findFolder.user.firstName} ${findFolder.user.lastName}`,
      recruiter: findFolder.recruiter.contactName,
      company: findFolder.recruiter.company,
      email: findFolder.recruiter.email,
      idFolder: findFolder.id,
    };
  }

  const onClickDelete = async (e) => {
    e.preventDefault();
    await dispatch(
      removeCandidateFromFolder(folderObject.idFolder, idCandidate)
    );
    dispatch(getAllFolders());
    handleClose(DELETE_CLICK_ACTION);
  };

  const handleClickOpen = (id, action) => {
    if (action === DELETE_CLICK_ACTION) {
      setOpenDelete(true);
    }
    setIdCandidate(id);
  };

  const handleClose = (action) => {
    if (action === DELETE_CLICK_ACTION) {
      setOpenDelete(false);
    }
  };

  const RemoveCandidateModal = () => (
    <Dialog
      open={openDelete}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'¡Esta por eliminar un candidato de esta carpeta!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Presione en el boton eliminar realizar la acción o de lo contrario en
          cancelar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(DELETE_CLICK_ACTION)}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={(e) => onClickDelete(e, idCandidate)}
          color="primary"
          autoFocus
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={classes.background}>
      <h2> CARPETA PARA: {folderObject.company} </h2>
      <h2> SELECTOR: {folderObject.selector} </h2>
      <h2> RECRUITER: {folderObject.recruiter} </h2>
      <h2> EMAIL: {folderObject.email} </h2>

      <Container className={classes.container} maxWidth="xl">
        <Grid
          className={classes.paddingCandidates}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {folders.length &&
            folderObject.candidates.map(
              (candidate, index) =>
                index < DEFAULT_ROWS_PER_PAGE &&
                candidate.visibility === 'listed' && (
                  <div key={index} className={classes.CandidateCard}>
                    <CandidateCard candidate={candidate} />
                    <Button
                      onClick={() => {
                        handleClickOpen(candidate.id, DELETE_CLICK_ACTION);
                      }}
                    >
                      {' '}
                      Delete this Candidate{' '}
                    </Button>
                  </div>
                )
            )}
        </Grid>
        {folderObject.candidates && folderObject.candidates.length && (
          <Grid>
            <Paginator />
          </Grid>
        )}
      </Container>
      {RemoveCandidateModal()}
    </div>
  );
}
export default Folder;
