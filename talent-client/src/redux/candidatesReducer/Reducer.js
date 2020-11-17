import * as actions from './Constants.js';

const initialState = {
  allCandidates: [],
  candidate: {},
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_CANDIDATES:
      return {
        ...state,
        allCandidates: action.payload,
      };
    case actions.DELETE_CANDIDATE:
      return {
        ...state,
        allCandidates: state.allCandidates.filter(
          (candidate) => candidate.id !== action.payload
        ),
      };
    case actions.CANDIDATE_BY_ID:
      return {
        ...state,
        candidate: action.payload,
      };
    case actions.CANDIDATE_UPDATE:
      return {
        ...state,
        allCandidates: state.allCandidates
          .filter((candidate) => candidate.id !== action.payload.id)
          .concat(action.payload),
      };
    default:
      return state;
  }
}
