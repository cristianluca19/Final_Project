import * as actions from './Constants.js';

export function getAllCandidates(candidates) {
    return {
        type: actions.GET_ALL_CANDIDATES,
        payload: candidates,
    }
}
