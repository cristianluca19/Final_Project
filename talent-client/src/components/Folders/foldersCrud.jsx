import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles.js';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import {getAllFolders, deleteFolder} from '../../redux/foldersReducer/Action';
import { useSelector } from 'react-redux';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Backdrop, Fade, TextField } from '@material-ui/core';


function FoldersCrud() {
    
    const dispatch = useDispatch();
    const folders = useSelector(
        (store) => store.FolderReducer.allFolders
    );
    const classes = useStyles();
    const [folderData, setFolderData] = React.useState({})
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [idFolder, setIdFolder] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const columns = [
        { id: 'id', label: 'ID', minWidth: 30 },
        { id: 'selector', label: 'SELECTOR', minWidth: 100 },
        { id: 'status', label: 'STATUS', minWidth: 100 },
        { id: 'opened', label: 'OPENED', minWidth: 100 },
        { id: 'recruiter', label: 'RECRUITER', minWidth: 100 },
        { id: 'email', label: 'EMAIL', minWidth: 100 },
        { id: 'company', label: 'COMPANY', minWidth: 100 },
        { id: 'view',   label: '', minWidth: 50 },
        { id: 'edit',   label: '', minWidth: 50},
        { id: 'delete', label: '', minWidth: 50 },
    ];
    const rows = [];
    
    if(folders) {
        folders
        .sort((a, b) => a.id - b.id)
        .map((folders) => {
            return rows.push(
                                {  
                                    id: folders.id, 
                                    selector: folders.user && folders.user.firstName + ' ' + folders.user.lastName,
                                    status: folders.status,
                                    opened: folders.opened.toString(),
                                    recruiter: folders.recruiter && folders.recruiter.contactName,
                                    email: folders.recruiter && folders.recruiter.email,
                                    company: folders.recruiter && folders.recruiter.company,
                                    key: folders.id,
                                }
                            )
            })
        }

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
    const onClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteFolder(idFolder));
        dispatch(getAllFolders());
        handleClose();
    };
    
    const handleClose = () => {
        setOpen(false);
        setOpenUpdate(false)
    };

    const handleInputFolder = (e) => {
        setFolderData({
            ...folderData,
            [e.target.id]: e.target.value,
        });
        };
        
    const handleClickOpen = (id, action) => {
            if (action === 'update') {
                //dispatch(getCandidateById(id));
                setOpenUpdate(true);
            } 
            setIdFolder(id);
        };
    
    const onClickUpdate = (e) => {
        e.preventDefault();
        console.log(folderData)
        // dispatch(updateCandidate(candidateData));
        setOpenUpdate(false);
    };

    useEffect(() => {
        dispatch(getAllFolders());
    }, []);
    
    return (
        <Paper  >
            <h1>FOLDERS</h1>
            <br />
            <TableContainer  >
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

                                                    {column.id === 'view' && (
                                                        <Link to={"/folder/" + row.id }>
                                                            <ViewIcon />
                                                        </Link>
                                                    )}

                                                    {column.id === 'edit' && (
                                                        <EditIcon onClick={()=> {handleClickOpen(column.id, 'update')} } />
                                                    )}

                                                    {column.id === 'delete' && (
                                                        <DeleteIcon onClick={() => handleClickDelete(row.id)}/>
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
                    {/*MODAL PARA ELIMINAR UNA FOLDER*/}
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
                            <Button
                                onClick={(e) => onClickDelete(e)}
                                color="primary"
                                autoFocus
                            >
                                Eliminar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    {/*MODAL PARA EDITAR UNA FOLDER*/}        
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
                                <h1 className={classes.titleCandidates}> Actualizar Carpeta </h1>
                                <form
                                className={classes.formCandidates}
                                noValidate
                                autoComplete="off"
                                >
                                    <TextField
                                        id="folderName"
                                        label="Name"
                                        value={folderData.name}
                                        onChange={(e) => handleInputFolder(e)}
                                    />
                                    <TextField
                                        id="opened"
                                        label="Opened"
                                        value={folderData.opened}
                                        onChange={(e) => handleInputFolder(e)}
                                    />
                                    <TextField
                                        id="status"
                                        label="Status"
                                        value={folderData.status}
                                        onChange={(e) => handleInputFolder(e)}
                                    />
                                    <br />
                                    <TextField
                                        id="user_id"
                                        label="Selector's Name"
                                        value={folderData.user_id}
                                        onChange={(e) => handleInputFolder(e)}
                                    />
                                    <TextField
                                        id="recruiter_id"
                                        label="Recruiter's name"
                                        value={folderData.name}
                                        onChange={(e) => handleInputFolder(e)}
                                    />
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

export default FoldersCrud;

