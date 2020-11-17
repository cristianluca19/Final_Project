import React, {useState} from 'react';
import axios from 'axios';
import { useStyles } from './styles.js';
import { Container, Grid, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {henryTheme} from '../../henryMuiTheme';
import CandidateCard from '../CandidateCard';

function RecruiterFolder({uuid}) {
  
  console.log(uuid)
  const classes = useStyles();
  const [ folder , setFolder ] = useState(null)
  const cardsMaxLimit = 10
  if (folder === null) {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/folders?uuid=${uuid}`)
    .then((response)=>{
      setFolder(response.data);
      console.log(response.data.candidates)
    })
    .catch((error)=>{
      console.log(error);
    })
  }
    if (folder === null) return <h1>Loading...</h1>

  return (
    <Container className={classes.container} maxWidth="xl">
      <ThemeProvider theme={henryTheme}>
  <Typography color='primary' gutterBottom variant="h5" component="h2">Candidatos Seleccionados{folder.recruiterId ?  ` para: ${folder.recruiterId}` : `.`}</Typography>
      <Grid
        className={classes.paddingCandidates}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {folder &&
          folder.candidates.map(
            (candidate, index) =>
              index < cardsMaxLimit &&
              candidate.visibility == 'listed' && (
                <div key={index} className={classes.CandidateCard}>
                  <CandidateCard user={candidate} />
                </div>
              )
          )}
      </Grid>
      </ThemeProvider>
    </Container>
    
  )
}

export default RecruiterFolder;