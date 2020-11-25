import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import RecruiterCreate from '.';
import henryMuiTheme from '../../henryMuiTheme';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid black',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: 'black',
  },
  addRecruiter: {
    position: 'relative',
    top: '12px',
    marginLeft: '20px',
    backgroundColor: 'yellow',
    '&:hover': {
      backgroundColor: 'yellow',
    },
  },
  centerModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function SimpleModal() {
  const classes = useStyles();

  const recruiterData = useSelector(
    (store) => store.FolderReducer.dossier.recruiter
  );

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <RecruiterCreate handleClose={handleClose}/>
    </div>
  );

  return (
    <div>
      {recruiterData && !recruiterData.length ? (
        <Button className={classes.addRecruiter} type="button" onClick={handleOpen}>
          Edit Recruiter
        </Button>
      ) : (
        <Button className={classes.addRecruiter} type="button" onClick={handleOpen}>
          Add Recruiter
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.centerModal}
      >
        {body}
      </Modal>
    </div>
  );
}