import React, { Component } from "react";
import { Route } from "react-router-dom";
import CandidateCard from "./components/CandidateCard";
import { increment, decrement } from "./redux/example/Action.js";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  //==============================================================
  const dispatch = useDispatch();
  const count = useSelector((store) => store.reducer.count);
  console.log(count);
  //===============================================================

  return (
    <div className='App'>
      <Route path='/' render={() => <CandidateCard />} />
{/* //======================================================================
    //Esta funcion esta solo de ejemplo para probar que redux esta funcional...SACAR ANTES DE MERGEAR 
    //====================================================================== */}
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
  {/* //======================================================================
     //Esta funcion esta solo de ejemplo para probar que redux esta funcional...SACAR ANTES DE MERGEAR 
    //====================================================================== */}
    </div>
  );
}

export default App;
