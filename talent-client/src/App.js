import { Route } from "react-router-dom";
import './App.css';
import Catalogue from "./components/Catalogue/index.jsx";
import ContentHome from "./components/ContentHome/index.jsx";
import Footer from "./components/Footer/index.jsx";
import Nav from "./components/Nav/index.jsx";
import CandidateCard from './components/CandidateCard'
import { increment, decrement } from "./redux/example/Action.js";
import { useSelector, useDispatch } from "react-redux";
import React from 'react';

function App() {
  //==============================================================
  const dispatch = useDispatch();
  const count = useSelector((store) => store.reducer.count);
  //===============================================================

  return (
    <div className="App">
      <Route path='/' render={() => <Nav />} />
      <Route path='/' render={() => <ContentHome />} />
      <Route path='/' render={() => <Catalogue />} />
      <Route path="/" render={() => <CandidateCard/>}/>
      <Route path='/' render={() => <Footer />} />
{/*     <div className='App'>
      <Route path='/' render={() => <CandidateCard />} />
//======================================================================
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
