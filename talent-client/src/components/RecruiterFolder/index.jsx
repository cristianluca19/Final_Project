import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStyles } from './styles.js';
import { Container, Grid, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { henryTheme } from '../../henryMuiTheme';
import CandidateCard from '../CandidateCard';
import { getDossierByUuid } from '../../redux/foldersReducer/Action.js';

function RecruiterFolder() {
  const { uuid } = useParams()
  const dispatch = useDispatch();
  const classes = useStyles();
  const [folder, setFolder] = useState([]);
  const [recruiter, setRecruiter] = useState([]);
  const cardsMaxLimit = 10;
  console.log(uuid)

  useEffect(() => {
    dispatch(getDossierByUuid(uuid)) // por si sirve a futuro...
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/folders?uuid=${uuid}`)
      .then((response) => {
        setRecruiter(response.data.recruiter);
        setFolder(response.data.candidates);
        return
      })
  }, [])

  if (!folder.length) return <h1>Loading...</h1>


  console.log('folder ', folder)
  console.log('recruiter ', recruiter)
  return (
    <Container className={classes.container} maxWidth="xl">
      <ThemeProvider theme={henryTheme}>
        <Typography color='primary' gutterBottom variant="h5" component="h2">Candidatos Seleccionados {Object.keys(recruiter).length ? ` para: ${recruiter.contactName} - ${recruiter.company}` : `:`}</Typography>
        <Grid
          className={classes.paddingCandidates}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {folder.length &&
            folder.map(
              (candidate, index) =>
                index < cardsMaxLimit &&
                // candidate.visibility == 'listed' && 
                (
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