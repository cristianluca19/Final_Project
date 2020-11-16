import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllCandidates() {
  return async (dispatch) => {
    const candidates = await axios.get(`${BACKEND_URL}/api/candidates`);
    dispatch({
      type: actions.GET_ALL_CANDIDATES,
      payload: candidates.data,
    });
  };
}

export function deleteCandidate(id) {
  return async (dispatch) => {
    const deleteCandidate = await axios.delete(
      `${BACKEND_URL}/api/candidates/${id}/delete`
    );
    dispatch({
      type: actions.DELETE_CANDIDATE,
      payload: id,
    });
  };
}
