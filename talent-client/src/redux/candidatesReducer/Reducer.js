import * as actions from './Constants.js';

const initialState = {
  allCandidates: [],
  candidate: {},
  bulkedCandidates: [],
  filterCandidates: [],
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
    case actions.GET_CANDIDATE_FILTER:
      return {
        ...state,
        filterCandidates: !action.payload.length
          ? []
          : state.allCandidates.filter((candidate) =>
              action.payload.includes(candidate.id)
            ),
      };
    default:
      return state;
  }
}
