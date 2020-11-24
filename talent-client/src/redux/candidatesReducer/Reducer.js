import * as actions from './Constants.js';

const initialState = {
  allCandidates: [],
  candidate: {},
  bulkedCandidates: [],
  pagedCandidates: [],
  pageStats: {},
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CANDIDATES_PAGE:
      return {
        ...state, 
        pagedCandidates: action.payload,
        pageStats: action.data,
      };
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
    case actions.GET_CANDIDATE_BY_ID:
      return {
        ...state,
        candidate: action.payload,
      };
    case actions.UPDATE_CANDIDATE:
      return {
        ...state,
        allCandidates: state.allCandidates
          .filter((candidate) => candidate.id !== action.payload.id)
          .concat(action.payload),
      };
    case actions.BULK_CANDIDATES:
      return {
        ...state,
        bulkedCandidates: action.payload,
      };
    default:
      return state;
  }
}
