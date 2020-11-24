import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CsvToJson from './components/csvToJson/CsvToJson';
import ContentHome from './components/ContentHome/index';
import Footer from './components/Footer/index';
import Nav from './components/Nav/index';
import CardsContainer from './components/CardsContainer';
import Dashboard from './components/Dashboard';
import Menu from './components/Dashboard/menu';
import RecruiterFolder from './components/RecruiterFolder';
import RecruiterCreate from './components/RecruiterCreate';
import { getAllCandidates } from './redux/candidatesReducer/Action.js';
import { getAllSkills } from './redux/skillsReducer/Action';
import { getAllFolders } from './redux/foldersReducer/Action';
import { getAllRecruiters } from './redux/recruitersReducer/Actions';
import './App.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCandidates());
    dispatch(getAllSkills());
    dispatch(getAllFolders());
    dispatch(getAllRecruiters());
  });

  return (
    <div className="App">
      <Switch>
        <Route exact path="/panel" render={() => <Dashboard />} />
        <Route
          path="/panel/candidates"
          render={() => <Dashboard componentToRender={'candidates'} />}
        />
        <Route
          path="/panel/skills"
          render={() => <Dashboard componentToRender={'skills'} />}
        />
        <Route path="/" render={() => <Nav />} />
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
      {/* <Route path="/panel" render={() => <Menu />} /> */}
    </div>
  );
}
export default App;
