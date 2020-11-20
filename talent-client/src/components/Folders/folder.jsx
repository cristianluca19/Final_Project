import PropTypes from 'prop-types';
import { Container, Grid } from '@material-ui/core';
import CandidateCard from '../CandidateCard';
import { useSelector } from 'react-redux';
import Paginator from '../Paginator';
import React from 'react';
import { useStyles } from './styles.js';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Backdrop, Fade, TextField, Avatar } from '@material-ui/core';
function Folder(props) {

const DEFAULT_ROWS_PER_PAGE = 30;
const classes = useStyles();
const [folderData, setFolderData] = React.useState({})
const [openDelete, setOpenDelete] = React.useState(false);
const [openUpdate, setOpenUpdate] = React.useState(false);
const [idCandidate, setIdCandidate] = React.useState(0);
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
const dispatch = useDispatch();

const candidates = [
    {
    firstName: 'Daniel',
    lastName: 'Stadler',
    location: 'Sarasota, TX, USA',
    skills: {
        hard: [
        'JavaScript',
        'React',
        'Redux',
        'HTML',
        'CSS',
        'SQL',
        'Node',
        'PHP',
        ],
        soft: ['Leadership', 'English', 'Portuguese'],
    },
    visibility: "listed",
    profilePicture: null,
    miniBio: `
    I'm a software engineer who believes that out-of-the-box thinking is what
    separates a great project from a good one. I do most of mine in Javascript, 
    React, Node.js and Python.`,
    linkedin: '/',
    github: 'https://github.com/henry-labs/talent'
    }
]

const handleInputFolder = (e) => {
    setFolderData({
      ...folderData,
      [e.target.id]: e.target.value,
    });
  };


const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

const onClickDelete = (e, id) => {
    e.preventDefault();
    //dispatch(deleteCandidate(id));
    handleClose();
};

const handleClickOpen = (id, action) => {
    if (action === 'update') {
      //dispatch(getCandidateById(id));
        setOpenUpdate(true);
    } else {
        setOpenDelete(true);
    }
    setIdCandidate(id);
};

const handleClose = (action) => {
    action === 'update' ? setOpenUpdate(false) : setOpenDelete(false);
};



return (
    <div className = {classes.background}> 

    <h1> FOLDER'S NAME </h1>
    <h2> SELECTOR'S NAME (WHO CREATED THE FOLDER) </h2>
    <h3> RECRUITER'S NAME </h3>

    <Container  className={classes.container}   maxWidth="xl">
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
                index < DEFAULT_ROWS_PER_PAGE &&
                candidate.visibility === 'listed' && (
                <div key={index} className={classes.CandidateCard}>
                    <CandidateCard user={candidate} />
                    <Button onClick={() => {handleClickOpen(candidate.id, 'delete')}}> Delete this Candidate </Button>
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
                Presione en el boton eliminar realizar la acción o de lo contrario
                en cancelar.
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

Folder.propTypes = {
    users: PropTypes.array.isRequired,
};

Folder.defaultProps = {
    users: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
};

export default Folder;
