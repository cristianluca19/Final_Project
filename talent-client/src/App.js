import { Route } from "react-router-dom";
import './App.css';
import Catalogue from "./components/Catalogue/index.jsx";
import ContentHome from "./components/ContentHome/index.jsx";
import Footer from "./components/Footer/index.jsx";
import Nav from "./components/Nav/index.jsx";
import CardsContainer from './components/CardsContainer';
import { useDispatch } from "react-redux";
import React from 'react';

function App() {
  //==============================================================
  const dispatch = useDispatch();
  //===============================================================

    // axios.get('http://localhost:3001/api/candidates')
    // .then((candidates) => {
    //   dispatch(getAllCandidates(candidates.data));
    //   return
    // })

  return (
    <div className="App">
      <Route path='/' render={() => <Nav />} />
      <Route path='/' render={() => <ContentHome />} />
      <Route path="/" render={() => <CardsContainer/>}/>
      <Route path='/' render={() => <Footer />} />
    </div>
  );
}
export default App;
