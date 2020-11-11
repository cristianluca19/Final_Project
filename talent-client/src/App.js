
import { Route } from 'react-router-dom'
import React from 'react';
import CardsContainer from './components/CardsContainer'
import { increment, decrement } from "./redux/example/Action.js";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  //==============================================================
  const dispatch = useDispatch();
  const count = useSelector((store) => store.reducer.count);
  //===============================================================

  return (
    <div>
      <Route path="/" render={() => <CardsContainer/>}/>
{/* //======================================================================
    //Esta funcion esta solo de ejemplo para probar que redux esta funcional...SACAR ANTES DE MERGEAR 
    //====================================================================== 
      <p>
        Clickeado: {count} veces
        <button
          onClick={() => {
            dispatch(increment());
          }}>
          +
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}>
          -
        </button>
      </p>
  //======================================================================
     //Esta funcion esta solo de ejemplo para probar que redux esta funcional...SACAR ANTES DE MERGEAR 
    //====================================================================== */}
    </div>
  );
}

export default App;
