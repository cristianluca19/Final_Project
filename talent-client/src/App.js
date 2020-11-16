import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React from 'react';
import './App.css';
import ContentHome from './components/ContentHome/index';
import Footer from './components/Footer/index';
import Nav from './components/Nav/index';
import CardsContainer from './components/CardsContainer';
import Dashboard from './components/Dashboard';
import { getAllCandidates } from './redux/candidatesReducer/Action.js';

function App() {
  //==============================================================
  const dispatch = useDispatch();
  //===============================================================

  // ===  FETCH ALL CANDIDATES FROM DB TO SAVE THEM ON REDUX STORE === future implementation may consider paginating
  // to lower loading times if candidate number is too high...
  dispatch(getAllCandidates());

  return (
    <div className="App">
      <Switch>
        <Route exact path="/panel" render={() => <Dashboard />} />
        <Route path="/panel/candidates" render={() => <Dashboard tableAction={'candidates'} />} />
        <Route path="/" render={() => <Nav />} />
      </Switch>
      <Route exact path="/" render={() => <ContentHome />} />
      <Route exact path="/" render={() => <CardsContainer />} />
      <Switch>
        <Route path="/panel" />
        <Route path="/" render={() => <Footer />} />
      </Switch>
    </div>
  );
}
export default App;
