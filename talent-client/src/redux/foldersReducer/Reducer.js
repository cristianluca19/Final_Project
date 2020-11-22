import * as actions from './Constants.js';

const initialState = {
  dossier: [],
  newFolder: [],
  allFolders: [],
  findFolder:{}
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
    case actions.DELETE_FOLDER:
      return {
        ...state,
        allFolders: state.allFolders.filter((folder) => folder.id !== action.payload),
      };
    case actions.UPDATE_FOLDER:
      return {
        ...state,
        allFolders: state.allFolders
              .filter((folder) => folder.id !== action.payload.id)
              .concat(action.payload),
      };
    default:
      return state;
  }
}
