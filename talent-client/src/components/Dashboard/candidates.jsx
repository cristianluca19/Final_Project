import React from 'react';
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

function Candidates() {

  const candidates = useSelector((store) => store.CandidateReducer.allCandidates);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'firstName', label: 'FIRST NAME', minWidth: 100 },
    { id: 'lastName', label: 'LAST NAME', minWidth: 100 },
    { id: 'country', label: 'COUNTRY', minWidth: 100 },
    { id: 'email', label: 'EMAIL', minWidth: 100 },
    { id: 'cohort', label: 'COHORTE', minWidth: 50, align: 'center' },
    { id: 'visibility', label: 'VISIBILITY', minWidth: 100 },
    { id: 'status', label: 'STATUS', minWidth: 100 }
  ];

  const rows = [];
  if(candidates) {
    candidates.map((candidate) => {
      rows.push({id: candidate.id, 
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        country: candidate.country,
        email: candidate.email,
        cohort: candidate.cohort,
        visibility: candidate.visibility,
        status: candidate.status
      })
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <h1>CANDIDATOS</h1><br/>
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>                  
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
    </Paper>
  );
}

export default Candidates;