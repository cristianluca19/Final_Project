import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CsvToJson from './components/csvToJson/CsvToJson';
import ContentHome from './components/ContentHome/index';
import Footer from './components/Footer/index';
import Nav from './components/Nav/index';
import CardsContainer from './components/CardsContainer';
import Dashboard from './components/Dashboard';
import RecruiterFolder from './components/RecruiterFolder';
import RecruiterCreate from './components/RecruiterCreate';
import { getAllCandidates } from './redux/candidatesReducer/Action.js';
import FoldersCrud from './components/Folders/index';
import Folder from './components/Folders/folder';
import { getAllFolders } from './redux/foldersReducer/Action';
import { getAllRecruiters } from './redux/recruitersReducer/Action';
import { getAllUsers } from './redux/usersReducer/Action';

import './App.css';

function App() {
  //==============================================================
  const dispatch = useDispatch();
  //===============================================================

  // ===  FETCH ALL CANDIDATES FROM DB TO SAVE THEM ON REDUX STORE === future implementation may consider paginating
  // to lower loading times if candidate number is too high...
  dispatch(getAllCandidates());
  dispatch(getAllFolders());
  dispatch(getAllRecruiters());
  dispatch(getAllUsers());

  return (
    <div className="App">
      <Switch>
        <Route path="/folder/:id" render={() => <Folder />} />
        <Route path="/folders" render={() => <FoldersCrud />} />
        <Route exact path="/panel" render={() => <Dashboard />} />
        <Route
          path="/panel/candidates"
          render={() => <Dashboard componentToRender={'candidates'} />}
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
    </div>
  );
}
export default App;
