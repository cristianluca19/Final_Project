import * as actions from './Constants.js';

const initialState = {
  allCandidates: [],
  bulkedCandidates: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_CANDIDATES:
      return {
        ...state,
        allCandidates: action.payload,
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
