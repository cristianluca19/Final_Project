import * as actions from './Constants.js';

const initialState = {
  allCandidates: [],
};

export default function Reducer(state = initialState, action) {
  console.log('consolaProcces: ', action);
  switch (action.type) {
    case actions.GET_ALL_CANDIDATES:
      return {
        ...state,
        allCandidates: action.payload,
      };
    default:
      return state;
  }
}
