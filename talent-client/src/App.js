import React, { useState } from 'react';
import logo from "./logo.svg";
import "./App.css";
import { Route } from 'react-router-dom'
import CandidateCard from './components/CandidateCard'
import CsvToJson from "./csvToJson/CsvToJson";

function App() {

  return (
    <div>
      <Route path="/" render={() => <CandidateCard/>}/>
      <Route path="/csv" component={CsvToJson}/>
    </div>
  )
}

export default App;
