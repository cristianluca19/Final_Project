import * as actions from './Constants.js';

const initialState = {
  dossier: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DOSSIER:
      return {
        ...state,
        dossier: action.payload,
      }
    default:
      return state;
  }
}
