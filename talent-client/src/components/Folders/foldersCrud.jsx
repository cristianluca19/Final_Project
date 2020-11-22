import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles.js';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import {
  getAllFolders,
  deleteFolder,
  updateFolder,
} from '../../redux/foldersReducer/Action';
import { useSelector } from 'react-redux';
import {
  FormControl,
  MenuItem,
  InputLabel,
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
  Select,
} from '@material-ui/core';

function FoldersCrud() {

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [idFolder, setIdFolder] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const classes = useStyles();
	const folders = useSelector((store) => store.FolderReducer.allFolders);
  const [folderData, setFolderData] = React.useState({});
  const recruiters = useSelector(
    (store) => store.RecruitersReducer.allRecruiters
  );
  const UPDATE_CLICK_ACTION = 'update';

  const columns = [
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'selector', label: 'SELECTOR', minWidth: 100 },
    { id: 'status', label: 'STATUS', minWidth: 100 },
    { id: 'opened', label: 'OPENED', minWidth: 100 },
    { id: 'recruiter', label: 'RECRUITER', minWidth: 100 },
    { id: 'email', label: 'EMAIL', minWidth: 100 },
    { id: 'company', label: 'COMPANY', minWidth: 100 },
    { id: 'view', label: '', minWidth: 50 },
    { id: 'edit', label: '', minWidth: 50 },
    { id: 'delete', label: '', minWidth: 50 },
  ];
  const rows = [];
	
	const findRecruiter = (recruiterId, searchFor) => {
		const recruiter = recruiters.find((recruiter)=> recruiter.id === recruiterId)
		return recruiter[searchFor];
	}

  if (folders) {
    folders
      .sort((a, b) => a.id - b.id)
      .map((folders) => {
        return rows.push({
          id: folders.id,
          uuid: folders.uuid,
          selector:
            folders.user &&
            `${folders.user.firstName} ${folders.user.lastName}`,
          status: folders.status,
          opened: folders.opened.toString(),
          recruiter: findRecruiter(folders.recruiterId, 'contactName'),
          email: findRecruiter(folders.recruiterId, 'email'),
          company: findRecruiter(folders.recruiterId, 'company'),
          key: folders.id,
        });
      });
  }

	
  useEffect(() => {
  }, [folders]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickDelete = (id) => {
    setIdFolder(id);
    setOpen(true);
  };
  const onClickDelete = (e) => {
    e.preventDefault();
    dispatch(deleteFolder(idFolder));
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
  };
  const handleOpenSelect = () => {
    setOpenSelect(true);
  };
  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleChangeSelect = (e) => {
    setFolderData({
      ...folderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = (id, action) => {
    if (action === UPDATE_CLICK_ACTION) {
      setOpenUpdate(true);
    }
    setIdFolder(id);
  };

  const onClickUpdate = (e) => {
    e.preventDefault();
		dispatch(updateFolder(idFolder, folderData));
		setOpenUpdate(false);
  };

  const EditFolderModal = () => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openUpdate}
      onClose={() => handleClose(UPDATE_CLICK_ACTION)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openUpdate}>
        <div className={classes.paper}>
          <h1 className={classes.titleCandidates}> Actualizar Carpeta </h1>
          <form
            className={classes.formCandidates}
            noValidate
            autoComplete="off"
          >
            <FormControl className={classes.formControl}>
              <InputLabel>Recruiter</InputLabel>
              <Select
                name="recruiterId"
                open={openSelect}
                onClose={handleCloseSelect}
                onOpen={handleOpenSelect}
                onChange={(e) => {
                  handleChangeSelect(e);
                }}
              >
                {recruiters &&
                  recruiters.map((recruiter, index) => {
                    return (
                      <MenuItem value={recruiter.id}>
                        {`${recruiter.contactName}, Compañia: ${recruiter.company}`}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
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

  const DeleteFolderModal = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'¡Esta a punto de eleminar esta carpeta!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Presione eleminar si desea hacerlo, o cancelar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={(e) => onClickDelete(e)} color="primary" autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );

  const FolderRow = (row) => (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format && typeof value === 'number'
              ? column.format(value)
              : value}
            {column.id === 'view' && (
              <Link to={'/folder/' + row.uuid}>
                <ViewIcon />
              </Link>
            )}
            {column.id === 'edit' && (
              <EditIcon
                onClick={() => {
                  handleClickOpen(row.id, UPDATE_CLICK_ACTION);
                }}
              />
            )}
            {column.id === 'delete' && (
              <DeleteIcon onClick={() => handleClickDelete(row.id)} />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );

  return (
    <Paper>
      <h1>FOLDERS</h1>
      <br />
      <TableContainer>
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
                return FolderRow(row);
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
      {EditFolderModal()}
      {DeleteFolderModal()}
    </Paper>
  );
}

export default FoldersCrud;
