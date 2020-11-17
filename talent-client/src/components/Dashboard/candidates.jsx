import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from './Styles/candidates.css.js';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCandidate, candidateById, candidateUpdate } from '../../redux/candidatesReducer/Action.js';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

function Candidates() {
  const candidates = useSelector(
    (store) => store.CandidateReducer.allCandidates
  );
  const candidate = useSelector((store) => store.CandidateReducer.candidate);
  const classes = useStyles();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [idCandidate, setIdCandidate] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const [candidateData, setCandidateData] = React.useState({
    firstName: 'Daniel',
    lastName: 'Stadler',
    country: 'Sarasota, TX, USA',
    email: 'Anissa_Wisozk65@yahoo.com',
    linkedin: 'https://hazle.com',
    cohort: '5',
    status: 'unemployed',
    visibility: 'listed',
    profilePicture:
      'https://s3.amazonaws.com/uifaces/faces/twitter/madebybrenton/128.jpg',
    miniBio: `
    I'm a software engineer who believes that out-of-the-box thinking is what
     separates a great project from a good one. I do most of mine in Javascript, 
     React, Node.js and Python.`,
    github: 'https://github.com/henry-labs/talent',
  });

  useEffect(() => {
    Object.keys(candidate).length !== 0 && setCandidateData(candidate);
  }, [candidates, candidate]);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'firstName', label: 'FIRST NAME', minWidth: 100 },
    { id: 'lastName', label: 'LAST NAME', minWidth: 100 },
    { id: 'country', label: 'COUNTRY', minWidth: 80 },
    { id: 'email', label: 'EMAIL', minWidth: 100 },
    { id: 'cohort', label: 'COHORTE', minWidth: 30, align: 'center' },
    { id: 'visibility', label: 'VISIBILITY', minWidth: 60 },
    { id: 'status', label: 'STATUS', minWidth: 60 },
    { id: 'crud', label: '', minWidth: 50 },
  ];

  const rows = [];
  if (candidates) {
    candidates
      .sort((a, b) => a.id - b.id)
      .map((candidate) => {
        return rows.push({
          id: candidate.id,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          country: candidate.country,
          email: candidate.email,
          cohort: candidate.cohort,
          visibility: candidate.visibility,
          status: candidate.status,
          crud: '',
          key: candidate.id,
        });
      });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteCandidate(id));
    handleClose();
  };

  const handleClickOpen = (id, action) => {
    if (action === 'update') {
      dispatch(candidateById(id));
      setOpenUpdate(true);
    } else {
      setOpenDelete(true);
    }
    setIdCandidate(id);
  };

  const handleClose = (action) => {
    action === 'update' ? setOpenUpdate(false) : setOpenDelete(false);
  };

  const handleInputCandidate = (e) => {
    setCandidateData({
      ...candidateData,
      [e.target.id]: e.target.value,
    });
  };

  const onClickUpdate = (e) => {
    e.preventDefault();
    dispatch(candidateUpdate(candidateData));
    setOpenUpdate(false);
  };

  return (
    <Paper className={classes.root}>
      <h1>CANDIDATOS</h1>
      <br />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                          {column.id === 'crud' && (
                            <ul className={classes.ulEditCondidate}>
                              <li className={classes.liEditCondidate}>
                                <EditIcon
                                  onClick={() =>
                                    handleClickOpen(row.id, 'update')
                                  }
                                />
                              </li>
                              <li className={classes.liEditCondidate}>
                                <DeleteIcon
                                  onClick={() =>
                                    handleClickOpen(row.id, 'delete')
                                  }
                                />
                              </li>
                            </ul>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div>
        <Dialog
          open={openDelete}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'¡Esta por eliminar un candidato!'}
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
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openUpdate}
          onClose={() => handleClose('update')}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openUpdate}>
            <div className={classes.paper}>
              <h1 className={classes.titleCandidates}>Modificar Usuario</h1>
              <form
                className={classes.formCandidates}
                noValidate
                autoComplete="off"
              >
                <Avatar
                  id="profilePicture"
                  alt="Remy Sharp"
                  src={candidateData.profilePicture}
                  className={classes.avatar}
                  value={candidateData.profilePicture}
                />
                <TextField
                  id="firstName"
                  label="Nombre"
                  value={candidateData.firstName}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <TextField
                  id="lastName"
                  label="Apellido"
                  value={candidateData.lastName}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <TextField
                  id="country"
                  label="Ciudad"
                  value={candidateData.country}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <br />
                <TextField
                  id="email"
                  label="Email"
                  value={candidateData.email}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <TextField
                  id="linkedin"
                  label="LinkedIn"
                  value={candidateData.linkedin}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <TextField
                  id="github"
                  label="GitHub"
                  value={candidateData.github}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <br />
                <TextField
                  id="visibility"
                  label="Visibilidad"
                  value={candidateData.visibility}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <TextField
                  id="status"
                  label="Estado"
                  value={candidateData.status}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <TextField
                  id="cohort"
                  label="Cohorte"
                  value={candidateData.cohort}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <br />
                <br />
                <TextField
                  id="miniBio"
                  label="Minibio"
                  multiline
                  rows={2}
                  value={candidateData.miniBio}
                  variant="outlined"
                  className={classes.miniBio}
                  onChange={(e) => handleInputCandidate(e)}
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={(e) => onClickUpdate(e)}
                >
                  Guardar
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </Paper>
  );
}

export default Candidates;
