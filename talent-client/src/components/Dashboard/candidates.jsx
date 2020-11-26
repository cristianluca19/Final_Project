import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './Styles/candidates.css.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InputBase from '@material-ui/core/InputBase';
import {
  deleteCandidate,
  getCandidateById,
  updateCandidate,
} from '../../redux/candidatesReducer/Action.js';
import SaveIcon from '@material-ui/icons/Save';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Backdrop,
  Fade,
  TextField,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';

const DEFAULT_ROWS_PER_PAGE = 25;

function Candidates() {
  const allCandidates = useSelector(
    (store) => store.CandidateReducer.allCandidates
  );
  const candidate = useSelector((store) => store.CandidateReducer.candidate);

  const classes = useStyles();
  // const [cohorts, setCohorts] = React.useState([]);
  const [candidates, setCandidates] = React.useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [idCandidate, setIdCandidate] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const dispatch = useDispatch();
  const [candidateData, setCandidateData] = React.useState({
    firstName: 'Daniel',
    lastName: 'Stadler',
    country: 'Sarasota, TX, USA',
    email: 'Anissa_Wisozk65@yahoo.com',
    linkedin: 'https://hazle.com',
    cohortId: '5',
    status: 'unemployed',
    visibility: 'listed',
    profilePicture:
      'https://s3.amazonaws.com/uifaces/faces/twitter/madebybrenton/128.jpg',
    miniBio: `
    I'm a software engineer who believes that out-of-the-box thinking is what
     separates a great project from a good one. I do most of mine in Javascript, 
     React, Node.js and Python.`,
    comment: 'Buenas habilidades de liderazgo y trabajo en equipo...',
    github: 'https://github.com/henry-labs/talent',
    cohort: {
      name: 'WebFT-01',
    },
  });

  const cohorts = Array.from(
    new Set(
      allCandidates.map((dataCohort) => ({
        name: dataCohort.cohort.name,
        id: dataCohort.cohortId,
      }))
    )
  );

  useEffect(() => {
    Object.keys(candidate).length && setCandidateData(candidate);
    setCandidates(allCandidates);
    // allCandidates.forEach((item) => {
    //   if (!cohorts.includes(item.cohort)) {
    //     setCohorts([...cohorts, item.cohortId]);
    //   }
    // });
  }, [allCandidates, candidate]);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 10 },
    { id: 'firstName', label: 'FIRST NAME', minWidth: 60 },
    { id: 'lastName', label: 'LAST NAME', minWidth: 60 },
    { id: 'country', label: 'COUNTRY', minWidth: 180 },
    { id: 'email', label: 'EMAIL', minWidth: 180 },
    { id: 'cohortName', label: 'COHORTE', minWidth: 30, align: 'center' },
    { id: 'visibility', label: 'VISIBILITY', minWidth: 90 },
    { id: 'status', label: 'STATUS', minWidth: 90 },
    { id: 'iconUpdateDelete', label: '', minWidth: 60 },
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
          cohortId: candidate.cohortId,
          cohortName: candidate.cohort.name,
          visibility: candidate.visibility,
          status: candidate.status,
          score: candidate.score,
          iconUpdateDelete: '',
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
      dispatch(getCandidateById(id));
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

  const handleSelectCandidate = (e, visibilityOrStatus) => {
    setCandidateData({
      ...candidateData,
      [visibilityOrStatus]: e.target.value,
    });
  };

  const onClickUpdate = (e) => {
    e.preventDefault();
    dispatch(updateCandidate(candidateData));
    setOpenUpdate(false);
  };

  const handleFilter = (e, property) => {
    let value = Number(e.target.value)
    const filtered = allCandidates.filter(
      (item) => {
        return item[property] === value
      }
    );
    setCandidates(filtered);
  };

  const handleSearch = (e) => {
    const filtered = allCandidates.filter(
      (item) =>
        item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.country.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCandidates(filtered);
  };

  const dialogDeleteCandidate = () => (
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
          Presione en el boton eliminar realizar la acción o de lo contrario en
          cancelar.
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
  );

  const modalUpdateCandidate = () => (
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
            <div className={classes.selectItems}>
              <InputLabel id="visibilityLabel">Visibilidad</InputLabel>
              <Select
                labelId="Visibilidad"
                id="visibility"
                value={candidateData.visibility}
                onChange={(e) => handleSelectCandidate(e, 'visibility')}
                className={classes.selectOptions}
              >
                <MenuItem value={'listed'}>Listed</MenuItem>
                <MenuItem value={'unlisted'}>Unlisted</MenuItem>
                <MenuItem value={'private'}>Private</MenuItem>
              </Select>
            </div>
            <div className={classes.selectItems}>
              <InputLabel id="visibilityLabel">Estado</InputLabel>
              <Select
                labelId="Estado"
                id="status"
                value={candidateData.status}
                onChange={(e) => handleSelectCandidate(e, 'status')}
                className={classes.selectOptions}
              >
                <MenuItem value={'employed'}>Employed</MenuItem>
                <MenuItem value={'unemployed'}>Unemployed</MenuItem>
              </Select>
            </div>
            <TextField
              id="cohort"
              label="Cohorte"
              value={
                candidateData.cohort
                  ? candidateData.cohort.name
                  : candidateData.cohortId
              }
              onChange={(e) => handleInputCandidate(e)}
            />
            <br />
            <TextField
              label="Score"
              id="score"
              inputProps={{min: 0, max: 5, step: 0.1}}
              type="number"
              value={candidateData.score}
              onChange={(e) => handleSelectCandidate(e, 'score')}
              className={classes.selectOptionsStatus}
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
            <TextField
              id="comment"
              label="Comentario"
              multiline
              rows={1}
              value={candidateData.comment}
              variant="outlined"
              className={classes.miniBio}
              onChange={(e) => handleInputCandidate(e)}
            />
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
  );

  return (
    <Paper className={classes.root}>
      <div className={classes.filterContainer}>
        <h1 className={classes.text}>CANDIDATOS</h1>
        <div className={classes.filter}>
          <Paper component="form" className={classes.search}>
            <InputBase
              className={classes.input}
              placeholder="Name, country or email..."
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={handleSearch}
            />
          </Paper>
          <select
            onChange={(e) => {
              handleFilter(e, 'cohortId');
            }}
          >
            <option value="" disabled selected>
              Cohort
            </option>
            {cohorts
              .sort(function (a, b) {
                return a - b;
              })
              .map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            ;
          </select>
          <select
            onChange={(e) => {
              handleFilter(e, 'visibility');
            }}
          >
            <option value="" disabled selected>
              Visibility
            </option>
            {['listed', 'unlisted'].map((item) => (
              <option value={item}>{item}</option>
            ))}
            ;
          </select>
          <select
            onChange={(e) => {
              handleFilter(e, 'status');
            }}
          >
            <option value="" disabled selected>
              Status
            </option>
            {['employed', 'unemployed'].map((item) => (
              <option value={item}>{item}</option>
            ))}
            ;
          </select>

          <button onClick={() => setCandidates(allCandidates)}>
            View all candidates
          </button>
        </div>
      </div>
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
                          {column.id === 'iconUpdateDelete' && (
                            <ul className={classes.ulEditCandidate}>
                              <li className={classes.liEditCandidate}>
                                <EditIcon
                                  onClick={() =>
                                    handleClickOpen(row.id, 'update')
                                  }
                                />
                              </li>
                              <li className={classes.liEditCandidate}>
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
      {dialogDeleteCandidate()}
      {modalUpdateCandidate()}
    </Paper>
  );
}

export default Candidates;
