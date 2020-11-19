import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllCandidates() {
  return async (dispatch) => {
    const skills = await axios.get(`${BACKEND_URL}/skills`);
    dispatch({
      type: actions.GET_ALL_SKILLS,
      payload: skills.data,
    });
  };
}
