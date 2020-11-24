import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getModalStyle, useStyles } from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import { getFoldersByCompany } from '../../redux/recruitersReducer/Actions';
import { setActiveFolder } from '../../redux/foldersReducer/Action';
import { Button } from '@material-ui/core';

export default function ActiveFolder() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const recruitersData = useSelector(
    (store) => store.RecruitersReducer.allRecruiters
  );
  const foldersFromRecruiterData = useSelector(
    (store) => store.RecruitersReducer.foldersFromRecruiter
  );

  const allFolders = useSelector((store) => store.FolderReducer.allFolders);

  const [company, setCompany] = React.useState([]);
  const [folder, setFolder] = React.useState([]);
  const [foldersFromRecruiter, setFoldersFromRecruiter] = React.useState([]);
  const [openCompany, setOpenCompany] = React.useState(false);
  const [openFolder, setOpenFolder] = React.useState(false);

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
    if(foldersFromRecruiter === "no valor") {
      setFoldersFromRecruiter([])  
    } else {
      setFoldersFromRecruiter(foldersFromRecruiterData)
    }
    setOpenFolder(true);
  };

  const handleChangeCompany = (event) => {
    if(event.target.value === "") {
      setFoldersFromRecruiter("no valor")
    }
    setCompany(event.target.value);
    dispatch(getFoldersByCompany(event.target.value));
  };

  const handleChangeFolder = (event) => {
    setFolder(event.target.value);
    dispatch(setActiveFolder(event.target.value));
  };

  // const RedirectToFolderPreview = () => {
  //   <Redirect to="/previw/${folder.id}" />
  // }

  return (
    <div>
      {/* onClick={RedirectToFolderPreview} */}
      <Button> 
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
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {recruitersData.map((element, index) => (
            <MenuItem key={element.company} value={element.company}>
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
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {foldersFromRecruiter.id ?
          foldersFromRecruiter.folders.map((element, index) => (
            <MenuItem key={index} value={element.id}>
              <ListItemText primary={element.createdAt} />
            </MenuItem>
          ))
          :
          allFolders && allFolders.map((element, index) => (
            <MenuItem key={index} value={element.id}>
              <ListItemText primary={element.createdAt} />
            </MenuItem>
          ))
        }
        </Select>
      </FormControl>
      <Button>
        Edit recruiter fields
      </Button>
    </div>
  );
}