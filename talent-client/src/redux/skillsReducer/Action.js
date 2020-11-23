import axios from 'axios';
import { GET_ALL_SKILLS } from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllSkills() {
  return async (dispatch) => {
    const skills = await axios.get(`${BACKEND_URL}/skills`);
    dispatch({
      type: GET_ALL_SKILLS,
      payload: skills.data,
    });
  };
}
