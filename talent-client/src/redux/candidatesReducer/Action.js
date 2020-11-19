import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllCandidates() {
  return async (dispatch) => {
    const candidates = await axios.get(`${BACKEND_URL}/candidates`);
    dispatch({
      type: actions.GET_ALL_CANDIDATES,
      payload: candidates.data,
    });
  };
}

export const bulkCandidates = (jsonCandidates) => async (dispatch) => {
  const bulkedCandidates = await axios.post(
    `${BACKEND_URL}/candidates`,
    jsonCandidates
  );
  dispatch({
    type: actions.BULK_CANDIDATES,
    payload: bulkedCandidates.data,
  });
};
