import * as actions from './Constants.js';

const initialState = {
  dossier: [],
  newFolder: [],
  allFolders: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DOSSIER:
      return {
        ...state,
        dossier: action.payload,
      };
    case actions.NEW_FOLDER:
      return {
        ...state,
        newFolder: action.payload,
      };
    case actions.GET_ALL_FOLDERS:
      return {
        ...state,
        allFolders: action.payload,
      };
    case action.DELETE_FOLDER:
      return {
        ...state,
      };
    case action.UPDATE_FOLDER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
