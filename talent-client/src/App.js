import React from 'react';
import CsvToJson from './components/csvToJson/CsvToJson';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ContentHome from './components/ContentHome/index';
import Footer from './components/Footer/index';
import Nav from './components/Nav/index';
import CardsContainer from './components/CardsContainer';
import Dashboard from './components/Dashboard';
import RecruiterFolder from './components/RecruiterFolder';
import RecruiterCreate from './components/RecruiterCreate';
import { getAllCandidates } from './redux/candidatesReducer/Action.js';
import './App.css';

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
        <Route
          path="/panel/candidates"
          render={() => <Dashboard componentToRender={'candidates'} />}
        />
        <Route
          path="/panel/recruiter"
          render={() => <Dashboard/>}
        />
        <Route
          path="/panel/skills"
          render={() => <Dashboard/>}
        />
        <Route path="/" render={({ location }) => <Nav location={location.pathname} />} />
      </Switch>
      <Route exact path="/" render={() => <ContentHome />} />
      <Route exact path="/" render={() => <CardsContainer />} />
      <Route exact path="/csv" component={CsvToJson} />
      <Route exact path="/recruiters/add" render={() => <RecruiterCreate />} />
      <Route exact path="/dossier/:uuid">
        <ContentHome />
        <RecruiterFolder render={({ match }) => match.params.uuid} />
      </Route>
      <Switch>
        <Route path="/panel" />
        <Route path="/" render={() => <Footer />} />
      </Switch>
    </div>
  );
}
export default App;
