import * as actions from './Constants.js';

const initialState = {
  dossier: [],
  newFolder: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.NEW_FOLDER:
      return {
        ...state,
        newFolder: action.payload,
      };
    default:
      return state;
  }
}
