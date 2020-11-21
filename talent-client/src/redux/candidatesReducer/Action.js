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

export function deleteCandidate(id) {
  return async (dispatch) => {
    const deleteCandidate = await axios.delete(
      `${BACKEND_URL}/candidates/${id}/delete`
    );
    dispatch({
      type: actions.DELETE_CANDIDATE,
      payload: id,
    });
  };
}

export function removeCandidateFromFolder(idFolder, idCandidate) {
  return async (dispatch) => {
    const removedCandidate = await axios.delete(
      `${BACKEND_URL}/candidates/${idFolder}/removeCandidate/${idCandidate}`
    );
    dispatch({
      type: actions.REMOVE_CANDIDATE_FROM_FOLDER,
      payload: removedCandidate,
    });
  };
}

export function getCandidateById(id) {
  return async (dispatch) => {
    const candidate = await axios.get(`${BACKEND_URL}/candidates/${id}`);
    dispatch({
      type: actions.GET_CANDIDATE_BY_ID,
      payload: candidate.data,
    });
  };
}

export function updateCandidate(candidateData) {
  return async (dispatch) => {
    const candidate = await axios.put(
      `${BACKEND_URL}/candidates/${candidateData.id}/update`,
      candidateData
    );
    dispatch({
      type: actions.UPDATE_CANDIDATE,
      payload: candidateData,
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
