import * as actions from './Constants.js';

const initialState = {
    allFolders: [],
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_ALL_FOLDERS:
            return {
            ...state,
            allFolders: action.payload,
            };
        case action.DELETE_FOLDER:
            return {
            ...state,
            }
        
        default:
            return state;
    }
}