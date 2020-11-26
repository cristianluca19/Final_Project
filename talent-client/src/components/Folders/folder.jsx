import React, { useEffect } from 'react';
import CandidateCard from '../CandidateCard';
import { useSelector } from 'react-redux';
import Paginator from '../Paginator';
import { useStyles } from './styles.js';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import {
  removeCandidateFromFolder,
} from '../../redux/foldersReducer/Action';
import {
  addNewComment,
  editComment,
  getCommentsByFolderId,
  deleteComment,
} from '../../redux/commentsReducer/Action';
import {
  FormControl,
  Container,
  Grid,
  TextField,
  TextareaAutosize,
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

function Folder(props) {
  

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAddComment, setOpenAddComment] = React.useState(false);
  const [openEditComment, setOpenEditComment] = React.useState(false);
  const [openDeleteComment, setOpenDeleteComment] = React.useState(false);
  const [inputTextField, setInputTextField] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('selector');
  const [idCandidate, setIdCandidate] = React.useState(0);
  const [idComment, setIdComment] = React.useState(0);
  const DEFAULT_ROWS_PER_PAGE = 30;
  const classes = useStyles();
  const dispatch = useDispatch();
  const folders = useSelector((store) => store.FolderReducer.allFolders);
  const comments = useSelector(
    (store) => store.CommentsReducer.allCommentsByFolderId
  );
  const users = useSelector((store) => store.UsersReducer.allUsers);
  const path = window.location.pathname.split('/folder/');
  const findFolder = folders.find((folder) => folder.uuid === path[1]);
  const DELETE_CLICK_ACTION = 'delete';
  const ADD_COMMENT_CLICK_ACTION = 'addComment';
  const EDIT_COMMENT_CLICK_ACTION = 'editComment';
  const DELETE_COMMENT_CLICK_ACTION = 'deleteComment';

  let folderObject = {};
  if (folders.length) {
    folderObject = {
      candidates: findFolder.candidates && findFolder.candidates,
      selector:
        findFolder.user &&
        `${findFolder.user.firstName} ${findFolder.user.lastName}`,
      recruiterId: findFolder.recruiter && findFolder.recruiter.id,
      recruiter: findFolder.recruiter && findFolder.recruiter.contactName,
      company: findFolder.recruiter && findFolder.recruiter.company,
      email: findFolder.recruiter && findFolder.recruiter.email,
      idFolder: findFolder.id,
    };
  }

  useEffect(() => {
    findFolder && dispatch(getCommentsByFolderId(findFolder.id));
  }, [findFolder]);

  const recruiterComment = comments.find(
    (comment) => comment.recruiterId === folderObject.recruiterId
  );
  const selectorComments = comments.filter(
    (comment) => comment.recruiterId !== folderObject.recruiterId
  );

  selectorComments.sort((a, b) => a.id - b.id)
  
  const createRows = (selectorComents, commentForRecruiter) => {
    return { selectorComents, commentForRecruiter };
  };

  const rows = [createRows(selectorComments, recruiterComment)];

  const findUser = (id) => {
    const user = users.find((user) => user.id === id);
    return `${user.firstName} ${user.lastName}`;
  };

  const onClickDelete = (e, action) => {
    e.preventDefault();

    if(action === DELETE_CLICK_ACTION){
    dispatch(removeCandidateFromFolder(folderObject.idFolder, idCandidate));
    handleClose(DELETE_CLICK_ACTION);
    }

    if(action === DELETE_COMMENT_CLICK_ACTION){
      
    dispatch(deleteComment(idComment));
    handleClose(DELETE_COMMENT_CLICK_ACTION);
    }
  };

  const handleClickOpen = (id, action) => {
    if (action === DELETE_CLICK_ACTION) {
      setOpenDelete(true);
      setIdCandidate(id);
    }
    if (action === ADD_COMMENT_CLICK_ACTION) {
      setOpenAddComment(true);
    }
    if (action === EDIT_COMMENT_CLICK_ACTION){
      setIdComment(id);
      setOpenEditComment(true);
    }
    if (action === DELETE_COMMENT_CLICK_ACTION){
      setIdComment(id);
      setOpenDeleteComment(true);
    }
  };

  const handleClose = (action) => {
    if (action === DELETE_CLICK_ACTION) setOpenDelete(false);
    if (action === ADD_COMMENT_CLICK_ACTION) setOpenAddComment(false);
    if (action === EDIT_COMMENT_CLICK_ACTION) setOpenEditComment(false);
    if (action === DELETE_COMMENT_CLICK_ACTION) setOpenDeleteComment(false);
  };

  const handleSave = (e, action) => {
    e.preventDefault();
    const selectorId = 1; //este es el ID del usuario autenticado que escribio el comentario por el momento se hardcodea
    const datas = {};

    if(action === ADD_COMMENT_CLICK_ACTION){
        if (selectValue === 'selector') datas.userId = selectorId;
        if (selectValue === 'recruiter') {
          datas.userId = selectorId;
          datas.recruiterId = folderObject.recruiterId;
        }
        datas.folderId = findFolder.id;
        datas.content = inputTextField;

        dispatch(addNewComment(datas));
        setSelectValue('selector');
        setInputTextField('');
        handleClose(ADD_COMMENT_CLICK_ACTION);
  }

    if(action === EDIT_COMMENT_CLICK_ACTION){
        datas.commentId = idComment;
        datas.content = inputTextField;
        dispatch(editComment(datas));
        handleClose(EDIT_COMMENT_CLICK_ACTION);
        setInputTextField('');
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
          Presione en el boton eliminar para realizar la acción o de lo
          contrario en cancelar.
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
          onClick={(e) => onClickDelete(e, DELETE_CLICK_ACTION)}
          color="primary"
          autoFocus
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );

  const addCommentModal = () => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openAddComment}
      onClose={() => handleClose(ADD_COMMENT_CLICK_ACTION)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openAddComment}>
        <div className={classes.paper}>
          <h1 className={classes.titleCandidates}> Agregar Comentario </h1>
          <form
            className={classes.formCandidates}
            noValidate
            autoComplete="off"
          >
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-full-width"
                  style={{ margin: 1 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => {
                    setInputTextField(e.target.value);
                  }}
                >
                  {' '}
                </TextField>
              </FormControl>
            </div>
            <div>
              {' '}
              <h4> Dirigido A </h4>{' '}
            </div>
            <div>
              <FormControl className={classes.formControl}>
                    
              { recruiterComment && recruiterComment ? 
                <Select
                  name="selectorOrRecruiter"
                  defaultValue='selector'
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}
                >
                  <MenuItem value="selector"> Selector </MenuItem>
                </Select>
                    :
                    <Select
                  name="selectorOrRecruiter"
                  defaultValue='selector'
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}
                >
                  <MenuItem value="selector"> Selector </MenuItem>
                  <MenuItem value="recruiter"> Reclutador </MenuItem>
                </Select>
                    }
              </FormControl>
            </div>
            <div>
              <Button onClick={() => handleClose(ADD_COMMENT_CLICK_ACTION)}>
                {' '}
                Cancelar{' '}
              </Button>
              <Button onClick={(e) => handleSave(e, ADD_COMMENT_CLICK_ACTION)}> Guardar </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );

  const editCommentModal = () => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openEditComment}
      onClose={() => handleClose(EDIT_COMMENT_CLICK_ACTION)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openEditComment}>
        <div className={classes.paper}>
          <h1 className={classes.titleCandidates}> Editar Comentario </h1>
          <form
            className={classes.formCandidates}
            noValidate
            autoComplete="off"
          >
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  id="outlined-full-width"
                  style={{ margin: 1 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => {
                    setInputTextField(e.target.value);
                  }}
                >
                  {' '}
                </TextField>
              </FormControl>
            </div>
            <div>
              <Button onClick={() => handleClose(EDIT_COMMENT_CLICK_ACTION)}>
                {' '}
                Cancelar{' '}
              </Button>
              <Button onClick={(e) => handleSave(e, EDIT_COMMENT_CLICK_ACTION)}> Guardar </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );

  const deleteCommentModal = () => (
    <Dialog
      open={openDeleteComment}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'¡Esta por eliminar este comentario!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Presione en el boton eliminar para realizar la acción o de lo
          contrario en cancelar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(DELETE_COMMENT_CLICK_ACTION)}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          onClick={(e) => onClickDelete(e, DELETE_COMMENT_CLICK_ACTION)}
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
            folderObject.candidates &&
            folderObject.candidates.map(
              (candidate, index) =>
                index < DEFAULT_ROWS_PER_PAGE &&
                candidate.visibility === 'listed' && (
                  <div key={index} className={classes.CandidateCard}>
                    <CandidateCard candidate={candidate} />
                    {findFolder && findFolder.status === 'sent' ? (
                      <div> </div>
                    ) : (
                      <Button
                        onClick={() => {
                          handleClickOpen(candidate.id, DELETE_CLICK_ACTION);
                        }}
                      >
                        {' '}
                        Delete this Candidate{' '}
                      </Button>
                    )}
                  </div>
                )
            )}
        </Grid>

        <Grid>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <h1> Comentarios Internos </h1>
                  </TableCell>
                  <TableCell align="center">
                    <h1> Comentario para reclutador </h1>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {row &&
                          row.selectorComents.map((campo) => (
                            <div>
                              <h3 style={{ backgroundColor: '#cfd1d2' }}>
                                {' '}
                                {campo && findUser(campo.userId)}{' '}
                              </h3>
                              <TableRow >
                                <label>
                                    {campo && campo.content}
                                </label>
                                <EditIcon onClick={()=> handleClickOpen(campo.id, EDIT_COMMENT_CLICK_ACTION) }/>
                                <DeleteIcon onClick={()=> handleClickOpen(campo.id, DELETE_COMMENT_CLICK_ACTION) }/>
                              </TableRow>
                            </div>
                          ))}{' '}
                      </TableCell>
                      <h3 style={{ backgroundColor: '#cfd1d2' }}>
                        {' '}
                        {row.commentForRecruiter &&
                          findUser(row.commentForRecruiter.userId)}{' '}
                      </h3>

                        { row.commentForRecruiter && row.commentForRecruiter.content  ?    
                            <div>
                              <label>                    
                                  {row.commentForRecruiter &&
                                    row.commentForRecruiter.content}
                              </label>
                              <EditIcon onClick={()=> handleClickOpen(row.commentForRecruiter.id, EDIT_COMMENT_CLICK_ACTION) }/>
                              <DeleteIcon onClick={()=> handleClickOpen(row.commentForRecruiter.id, DELETE_COMMENT_CLICK_ACTION) }/>
                              </div>
                              :
                              <div> </div>
                      }
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid>
          {' '}
          <Button onClick={() => handleClickOpen(0, ADD_COMMENT_CLICK_ACTION)}>
            {' '}
            Agregar comentario{' '}
          </Button>{' '}
        </Grid>
      </Container>
      {addCommentModal()}
      {RemoveCandidateModal()}
      {editCommentModal()}
      {deleteCommentModal()}
    </div>
  );
}
export default Folder;
