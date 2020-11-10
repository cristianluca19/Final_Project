import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";


//======================================================================
//Esta funcion esta solo de ejemplo para probar que redux esta funcional...SACAR ANTES DE MERGEAR 
//======================================================================

import{
    INCREMENT,
    DECREMENT 
}from './Action.js'

const initialState = {
  count: 0
}

export function Reducer(state = initialState, action){
  switch (action.type) {
    case INCREMENT:
        return {
            ...state,
            count: state.count +1
        }
    case DECREMENT:
        return {
            ...state,
            count: state.count - 1
        }
    default:
      return state;
  }
};

export default createStore(
    Reducer,
    compose(applyMiddleware(thunk))
  );