import * as actions from './Constants.js';

const initialState = {
  dossier: [],
  newFolder: [],
  allFolders: [],
  activeFolder: null,
  folderById: [],
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
    case actions.SET_ACTIVE_FOLDER:
      return {
        ...state,
        activeFolder: action.payload,
        };
    case actions.FOLDER_BY_ID:
      return {
        ...state,
        newFolder: action.payload,
      };
    default:
      return state;
  }
}
