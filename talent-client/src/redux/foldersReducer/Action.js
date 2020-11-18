import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function addToFolder() {
  return;
}

export function getFolder() {}

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
    const dossier = await axios.get(
      `${BACKEND_URL}/api/v1/folders?uuid=${uuid}`
    );
    dispatch({
      type: actions.GET_DOSSIER,
      payload: dossier.data,
    });
  };
}
