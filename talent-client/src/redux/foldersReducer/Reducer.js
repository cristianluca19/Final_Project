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
    case actions.DELETE_FOLDER:
      return {
        ...state,
        allFolders: state.allFolders.filter(
          (folder) => folder.id !== action.payload
        ),
      };
    case actions.UPDATE_FOLDER:
      return {
        ...state,
        allFolders: state.allFolders
          .filter((folder) => folder.id !== action.payload.id)
          .concat(action.payload),
      };
    case actions.REMOVE_CANDIDATE_FROM_FOLDER:
      const findFolder = state.allFolders.find(
        (folder) => folder.id === action.payload.idFolder
      );
      const candidatesFolder = state.allFolders.find(
        (folder) => folder.id === action.payload.idFolder
      ).candidates;
      const filterCandidtesFolder = candidatesFolder.filter(
        (candidate) => candidate.id !== action.payload.idCandidate
      );
      findFolder.candidates = filterCandidtesFolder;
      return {
        ...state,
        allFolders: state.allFolders
          .filter((folder) => folder.id !== action.payload.idFolder)
          .concat(findFolder),
      };
    default:
      return state;
  }
}
