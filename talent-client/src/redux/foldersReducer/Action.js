import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function addToFolder() {
  return;
}

export function getFolderById(id) {
  return async (dispatch) => {
    const folder = await axios.get(`${BACKEND_URL}/folders/${id}`);
    dispatch({
      type: actions.FOLDER_BY_ID,
      payload: folder.data,
    });
  };
}
export function newFolder(newFolder) {
  return {
    type: actions.NEW_FOLDER,
    payload: newFolder,
  };
}

export function confirmFolder() {
  return async (dispatch) => {};
}

export function getDossierByUuid(uuid) {
  return async (dispatch) => {
    const dossier = await axios.get(`${BACKEND_URL}/folders/dossier/${uuid}`);
    dispatch({
      type: actions.GET_DOSSIER,
      payload: dossier.data,
    });
  };
}

export function getAllFolders() {
  return async (dispatch) => {
    const folders = await axios.get(`${BACKEND_URL}/folders`);
    dispatch({
      type: actions.GET_ALL_FOLDERS,
      payload: folders.data,
    });
  };
}

export function setActiveFolder(idActiveFolder) {
  console.log(idActiveFolder)
  return async (dispatch) => {
    let folder;
    if (idActiveFolder) {
      folder = await axios.get(`${BACKEND_URL}/folders/${idActiveFolder}`);
    } else {
      // TODO llamar una folder draft?
    }
    dispatch({
      type: actions.SET_ACTIVE_FOLDER,
      payload: folder ? folder.data : null,
    });
  };
}