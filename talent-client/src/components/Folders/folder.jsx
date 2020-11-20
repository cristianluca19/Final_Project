import React from 'react';
import { Container, Grid } from '@material-ui/core';
import CandidateCard from '../CandidateCard';
import { useSelector } from 'react-redux';
import Paginator from '../Paginator';
import { useStyles } from './styles.js';
import { useDispatch } from 'react-redux';
import {getAllFolders,} from '../../redux/foldersReducer/Action';
import {removeCandidateFromFolder} from '../../redux/candidatesReducer/Action';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

function Folder(props) {

    const DEFAULT_ROWS_PER_PAGE = 30;

    const classes = useStyles();
    const [openDelete, setOpenDelete] = React.useState(false);
    const [idCandidate, setIdCandidate] = React.useState(0);
    const dispatch = useDispatch();

    const folders = useSelector(
        (store) => store.FolderReducer.allFolders
    );
    const path = window.location.pathname.split('/folder/')
    const findFolder = folders.filter(folder => folder.uuid === path[1])

    const folderObject = {
            candidates :  findFolder[0].candidates,
            selector: findFolder[0].user.firstName + findFolder[0].user.lastName,
            recruiter: findFolder[0].recruiter.contactName,
            company: findFolder[0].recruiter.company,
            idFolder: findFolder[0].id
    }

    const onClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(removeCandidateFromFolder(folderObject.idFolder, idCandidate));
        dispatch(getAllFolders())
        handleClose('delete');
    };

    const handleClickOpen = (id, action) => {
        if (action === 'delete') {
            setOpenDelete(true);
        } 
        setIdCandidate(id);
    };

    const handleClose = (action) => {
        if (action === 'delete') {
            setOpenDelete(false);
        } 
    };

    return (
        <div className = {classes.background}> 

            <h1> CARPETA PARA: {folderObject.company} </h1>
            <h2> SELECTOR: {folderObject.selector} </h2>
            <h3> RECRUITER: {folderObject.recruiter} </h3>
            <h4> COMPANY: {folderObject.company} </h4>

            <Container  className={classes.container}   maxWidth="xl">
                <Grid
                className={classes.paddingCandidates}
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                    {folderObject.candidates &&
                        folderObject.candidates.map(
                        (candidate, index) =>
                            index < DEFAULT_ROWS_PER_PAGE &&
                            candidate.visibility === 'listed' && (
                            <div key={index} className={classes.CandidateCard}>
                                <CandidateCard
                                    candidate={candidate}
                                />
                                <Button onClick={() => {handleClickOpen(candidate.id, 'delete')}}> Delete this Candidate </Button>
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
            <div>
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
                        Presione en el boton eliminar realizar la acción o de lo contrario en cancelar.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose('delete')} color="primary">
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
            </div>
        </div>
    );
}
export default Folder;
