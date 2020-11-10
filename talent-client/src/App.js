import React, { Component } from "react";
import logo from "./logo.svg";
import { increment, decrement } from "./redux/Action.js";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {

  //==============================================================
  const dispatch = useDispatch();
  const count = useSelector((store) => store.count);
  //===============================================================
  
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
{/* //======================================================================
    //Esta funcion esta solo de ejemplo para probar que redux esta funcional...SACAR ANTES DE MERGEAR 
    //====================================================================== */}
        <p>
          Clickeado: {count} veces
          <button
            onClick={() => {
              dispatch(increment())
            }}>+
          </button>
          <button
            onClick={() => {
              dispatch(decrement())
            }}>-
          </button>
        </p>
 {/* //======================================================================
     //Esta funcion esta solo de ejemplo para probar que redux esta funcional...SACAR ANTES DE MERGEAR 
    //====================================================================== */}
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
