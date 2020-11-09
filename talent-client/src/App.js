import { Route } from 'react-router-dom'

import CandidateCard from './components/CandidateCard'

function App() {

  return (
    <div>
      <Route path="/" render={() => <CandidateCard/>}/>
    </div>
  )
}

export default App;
