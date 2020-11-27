import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './styles';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import {
  getFoldersByCompany,
  getRecruiterById,
  getAllRecruiters,
} from '../../redux/recruitersReducer/Action';
import {
  setActiveFolder,
  deleteActiveFolder,
} from '../../redux/foldersReducer/Action';
import { Button } from '@material-ui/core';
import CreateRecruiterModal from '../RecruiterCreate/Modal';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ActiveFolder() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const recruitersData = useSelector(
    (store) => store.RecruitersReducer.allRecruiters
  );

  const recruiterData = useSelector(
    (store) => store.RecruitersReducer.recruiter
  );

  const foldersFromRecruiterData = useSelector(
    (store) => store.RecruitersReducer.foldersFromRecruiter
  );

  const allFolders = useSelector((store) => store.FolderReducer.allFolders);

  const activeFolder = useSelector((store) => store.FolderReducer.activeFolder);

  const draftFolder = useSelector((store) => store.FolderReducer.draftFolder);

  const [company, setCompany] = useState([]);
  const [folder, setFolder] = useState([]);
  const [foldersFromRecruiter, setFoldersFromRecruiter] = useState([]);
  const [openCompany, setOpenCompany] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);
  const [state, setState] = useState(null);

  // useEffect(() => {
  //   dispatch(getAllRecruiters())
  // }, [recruiterData])

  const DATE_FORMAT = 'YYYY/MM/DD - HH:mm:ss';

  const handleCloseCompany = () => {
    setOpenCompany(false);
  };

  const handleOpenCompany = () => {
    setOpenCompany(true);
  };

  const handleCloseFolder = () => {
    setOpenFolder(false);
  };

  const handleOpenFolder = () => {
    if (foldersFromRecruiter === 'no valor') {
      setFoldersFromRecruiter([]);
      dispatch(getRecruiterById());
    } else {
      setFoldersFromRecruiter(foldersFromRecruiterData);
    }
    setOpenFolder(true);
  };

  const handleChangeCompany = (event) => {
    if (event.target.value === '') {
      setFoldersFromRecruiter('no valor');
      dispatch(deleteActiveFolder());
      return;
    }
    setCompany(event.target.value);
    dispatch(getFoldersByCompany(event.target.value));
  };

  const handleChangeFolder = (event) => {
    setFolder(event.target.value);
    dispatch(getRecruiterById(event.target.value.recruiterId));
    dispatch(setActiveFolder(event.target.value));
  };

  const RedirectToFolderPreview = () => {
    if (activeFolder !== null) return setState(`/preview/${activeFolder.id}`);
    else return setState(`/preview/${draftFolder.id}`);
  };

  if (state) {
    return <Redirect to={state} />;
  }

  const handleSendEmail = () => {
    // activeFolder datos de la carpeta activa
    // recruiterData datos de la carpeta activa
    console.log("enviar mail")
  }

  return (
    <div>
      <Button
        className={classes.folderPreview}
        onClick={RedirectToFolderPreview}
      >
        Folder Preview
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Company</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openCompany}
          onClose={handleCloseCompany}
          onOpen={handleOpenCompany}
          value={company || ''}
          onChange={handleChangeCompany}
          MenuProps={MenuProps}
          style={{ color: 'white' }}
        >
          <MenuItem value="">
            <em>Draft</em>
          </MenuItem>
          {recruitersData.map((element, index) => (
            <MenuItem key={index} value={element.company}>
              <ListItemText primary={element.company} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Folders</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openFolder}
          onClose={handleCloseFolder}
          onOpen={handleOpenFolder}
          value={folder || ''}
          onChange={handleChangeFolder}
          MenuProps={MenuProps}
          style={{ color: 'white' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {foldersFromRecruiter.id
            ? foldersFromRecruiter.folders.map((element, index) => (
                <MenuItem key={index} value={element}>
                  <ListItemText
                    primary={moment(element.createdAt).format(DATE_FORMAT)}
                  />
                </MenuItem>
              ))
            : allFolders &&
              allFolders.map((element, index) => (
                <MenuItem key={index} value={element}>
                  <ListItemText
                    primary={moment(element.createdAt).format(DATE_FORMAT)}
                  />
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <Button>
        <CreateRecruiterModal />
      </Button>
      {activeFolder && (
        <Button
          className={classes.folderPreview}
          onClick={handleSendEmail}
        >
          Send folder
        </Button>
      )}
    </div>
  );
}
