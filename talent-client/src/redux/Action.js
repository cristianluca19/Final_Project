import axios from 'axios';
import * as actions from './Constants.js';

export function getAllCandidates() {
        return async (dispatch) => {
            const candidates = await axios.get('http://localhost:3001/api/candidates');
            dispatch ({
                type: actions.GET_ALL_CANDIDATES,
                payload: candidates.data,
            })
          }
}