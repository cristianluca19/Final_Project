import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
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
import { deleteCandidate } from '../../redux/candidatesReducer/Action.js';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Candidates() {
  const candidates = useSelector(
    (store) => store.CandidateReducer.allCandidates
  );
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [idCandidate, setIdCandidate] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  useEffect(() => {}, [candidates]);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'firstName', label: 'FIRST NAME', minWidth: 100 },
    { id: 'lastName', label: 'LAST NAME', minWidth: 100 },
    { id: 'country', label: 'COUNTRY', minWidth: 100 },
    { id: 'email', label: 'EMAIL', minWidth: 100 },
    { id: 'cohort', label: 'COHORTE', minWidth: 50, align: 'center' },
    { id: 'visibility', label: 'VISIBILITY', minWidth: 100 },
    { id: 'status', label: 'STATUS', minWidth: 100 },
    { id: 'crud', label: '', minWidth: 50 },
  ];

  const rows = [];
  if (candidates) {
    candidates.map((candidate) => {
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

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdCandidate(id);
  };

  const handleClose = () => {
    setOpen(false);
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
                            <DeleteIcon
                              onClick={() => handleClickOpen(row.id)}
                            />
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
          open={open}
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
            <Button onClick={handleClose} color="primary">
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
    </Paper>
  );
}

export default Candidates;
