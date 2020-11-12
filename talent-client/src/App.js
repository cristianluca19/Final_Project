import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import CandidateCard from './components/CandidateCard'
import './App.css';
// import Catalogue from "./components/Catalogue/index.jsx";
import ContentHome from "./components/ContentHome/index.jsx";
import Footer from "./components/Footer/index.jsx";
import Nav from "./components/Nav/index.jsx";
import CardsContainer from './components/CardsContainer';
import { useDispatch } from "react-redux";
import { getAllCandidates } from './redux/candidatesReducer/Action.js';

function App() {
  //==============================================================
  const dispatch = useDispatch();
  //===============================================================

  // ===  FETCH ALL CANDIDATES FROM DB TO SAVE THEM ON REDUX STORE === future implementation may consider paginating
  // to lower loading times if candidate number is too high...
  dispatch(getAllCandidates());


  return (
    <div>
      
      <Route path='/' render={() => <Nav />} />
      <Route path='/' render={() => <ContentHome />} />
      <Route path="/" render={() => <CardsContainer/>}/>
      {/* <Route path="/" render={() => <CandidateCard/>}/> */}
      <Route path='/' render={() => <Footer />} />
    </div>
  );
}
export default App;
