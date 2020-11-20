import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllFolders() {
    return async (dispatch) => {
        const folders = await axios.get(`${BACKEND_URL}/folders`);
        dispatch({
            type: actions.GET_ALL_FOLDERS,
            payload: folders.data,
        });
    };
}

export function deleteFolder(id) {
    return async (dispatch) => {
        await axios.delete(`${BACKEND_URL}/folders/`+id);
        dispatch({
            type: actions.DELETE_FOLDER,
        });
    };
}