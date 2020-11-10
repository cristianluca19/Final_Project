import React from 'react';
import { useStyles, theme } from './styles.js';
// import axios from 'axios';

// MUI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Container, IconButton } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import imgtest from '../../img/cvtest.png';



function CandidateCard (props) {

  const {firstName, lastName, location, skills, profilePicture, miniBio, linkedin, github } = props.user;

  const skillLimit = 7 // Limits the number of pills shown on the card.

  const classes = useStyles();

 
    // HANDLERS //
  const handleFolderAdd = () => {

  }

    return (
      <Container style={{"margin-top": "200px"}}>
        <Card className={classes.root}>
          <Grid container>
            <Grid item xs={4}>
              <CardMedia
                className={classes.media}
                image={profilePicture || imgtest}
                title='Henry Candidate'
              />
            </Grid>
              <Grid item xs={8} container direction="column" justify="flex-end" alignItems="stretch">
              <CardContent>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={10}>
                      <Typography gutterBottom variant="h5" component="h2">
                      {`${firstName} ${lastName}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <ThemeProvider theme={theme}>
                          <IconButton color="Secondary" edge='end' onClick={handleFolderAdd}>
                            <CreateNewFolderIcon/>
                          </IconButton>
                      </ThemeProvider>
                    </Grid>
                  </Grid>
                  <Typography className={classes.spacingBot} item xs={2} gutterBottom variant="body2" color="textSecondary" component="p">
                  Location: {location}.
                  </Typography>  
                  <ThemeProvider item xs={3} theme={theme} style={{"padding": 1}}>
                    <Grid container justify="space-evenly" alignItems="center" spacing={0}>
                    { skills.hard && skills.hard.map((techSkill,index) => (
                      (index < skillLimit) && <Chip size="small" color='primary' avatar={<Avatar>{techSkill.charAt(0).toUpperCase()}</Avatar>} label={techSkill} />
                      ))}
                    </Grid>
                  </ThemeProvider>
                  <Typography style={{"margin-top":"20px"}} item xs={4} variant="body2" color="textPrimary" component="p">
                    {miniBio.substring(0, 240)+'...'}
                  </Typography>    
              </CardContent>  
            </Grid>
          </Grid>
        </Card>
      </Container>
    )
};

export default CandidateCard;