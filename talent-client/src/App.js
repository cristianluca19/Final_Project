import { Route } from 'react-router-dom'
import React from 'react';
import CandidateCard from './components/CandidateCard'

function App() {

  return (
    <div>
      <Route path="/" render={() => <CandidateCard/>}/>
    </div>
  )
}

export default App;
