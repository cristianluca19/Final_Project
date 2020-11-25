import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './Styles/candidates.css.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
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

const DEFAULT_ROWS_PER_PAGE = 30;

function Candidates() {
  let allCandidates = useSelector(
    (store) => store.CandidateReducer.allCandidates
  );
  const candidate = useSelector((store) => store.CandidateReducer.candidate);
  const classes = useStyles();
  const [cohorts, setCohorts] = React.useState([]);
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
    setCandidates(allCandidates);
    allCandidates.forEach(item => {
      if (!(cohorts.includes(item.cohort))) {
        setCohorts([...cohorts, item.cohort])
      };
    })
  }, [allCandidates, candidate, cohorts]);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 10 },
    { id: 'firstName', label: 'FIRST NAME', minWidth: 60 },
    { id: 'lastName', label: 'LAST NAME', minWidth: 60 },
    { id: 'country', label: 'COUNTRY', minWidth: 180 },
    { id: 'email', label: 'EMAIL', minWidth: 180 },
    { id: 'cohort', label: 'COHORTE', minWidth: 30, align: 'center' },
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
          cohort: candidate.cohort,
          visibility: candidate.visibility,
          status: candidate.status,
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

  const handleFilter = (e, property, setState) => {
    const filtered = allCandidates.filter(item => item[property] === e.target.value)
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
  );

  const Selected = (props) => {
    return (
      <select
        onChange={(e) => {
          handleFilter(e, props.handle);
        }}
      >
        <option value='' disabled selected >{props.value}</option>
        {props.options.map(item => <option value={item} >{item}</option>)};
      </select>
    )
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.filterContainer}>
        <h1 className={classes.text}>CANDIDATOS</h1>
        <div className={classes.filter}>
          <Paper component="form" className={classes.search}>
            <InputBase
              className={classes.input}
              placeholder="Search by name or email..."
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <select
            onChange={(e) => {
              handleFilter(e, 'cohort');
            }}
          >
            <option value='' disabled selected >Cohort</option>
            {(cohorts.sort(function (a, b) { return a - b })).map(item => <option value={item} >{item}</option>)};
          </select>
          <select
            onChange={(e) => {
              handleFilter(e, 'visibility');
            }}
          >
            <option value='' disabled selected>Visibility</option>
            {['listed', 'unlisted'].map(item => <option value={item} >{item}</option>)};
          </select>
          <select
            onChange={(e) => {
              handleFilter(e, 'status');
            }}
          >
            <option value='' disabled selected>Status</option>
            {['employed', 'unemployed'].map(item => <option value={item} >{item}</option>)};
          </select>

          <button onClick={() => setCandidates(allCandidates)}>View all candidates</button>
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
