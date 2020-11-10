import { Route } from 'react-router-dom'

import CandidateCard from './components/CandidateCard'

function App() {

  // Mock user for CandidateCard
  const user = {
    firstName: 'Daniel',
    lastName: 'Stadler',
    location: 'Sarasota, TX, USA',
    skills: {
      hard: ['JavaScript', 'React', 'Redux', 'HTML', 'CSS', 'SQL', 'Node', 'PHP'],
      soft: ['Leadership', 'English', 'Portuguese']
    },
    profilePicture: null,
    miniBio: `
    I'm a software engineer who believes that out-of-the-box thinking is what
     separates a great project from a good one. I do most of mine in Javascript, 
     React, Node.js and Python.`,
    linkedin: '',
    github: ''
  }

  

  return (
    <div>
      <Route path="/" render={() => <CandidateCard user={user} />}/>
    </div>
  )
}

export default App;
