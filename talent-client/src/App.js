import { Route } from 'react-router-dom'
import React from 'react';
import CardsContainer from './components/CardsContainer'

function App() {

  return (
    <div>
      <Route path="/" render={() => <CardsContainer/>}/>
    </div>
  )
}

export default App;
