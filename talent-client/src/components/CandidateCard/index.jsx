import React from 'react';
import PropTypes from 'prop-types';
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
import Chip from '@material-ui/core/Chip';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import imgtest from '../../img/cvtest.png';
import Box from '@material-ui/core/Box';

function CandidateCard(props) {

  const { firstName, lastName, location, skills, profilePicture, miniBio, linkedin, github, role } = props.user;

  const skillLimit = 8 // Limits the number of pills shown on the card.

  const classes = useStyles();

  // HANDLERS //
  const handleFolderAdd = (event) => {

  }

  const handleMoreInfo = (event) => {
    event.preventDefault();
    let socialNetwork = event.target.name;
    console.log(socialNetwork);
    if (socialNetwork === undefined) {
      return
    } else if (socialNetwork === "GitHub") {
      window.location.href = `${github}`
    } else {
      window.location.href = `${linkedin}`
    }
    return
  }

  return (
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={4}>
            {/*Profile Picture*/}
            <CardMedia
              className={classes.media}
              image={profilePicture || imgtest}
              title='Henry Candidate'
            />
          </Grid>
          <Grid
            item xs={8}
            container
            direction="column"
            justify="flex-end"
            alignItems="stretch">
            <CardContent>
              <ThemeProvider theme={theme}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center">
                  <Grid item xs={8}>
                    {/*FullName*/}
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2">
                      {`${firstName} ${lastName}`}
                    </Typography>
                    {/*Top-right Icons*/}
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton name='GitHub' color="Secondary" edge='start' onClick={handleMoreInfo}>
                      <GitHubIcon name='GitHub' fontSize='small' />
                    </IconButton>
                  </Grid>
                  <Grid style={{ "padding-right": "10px" }} item xs={1}>
                    <IconButton name='LinkedIn' color="Secondary" edge='start' onClick={handleMoreInfo}>
                      <LinkedInIcon name='LinkedIn' />
                    </IconButton>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton color="Secondary" edge='end' onClick={handleFolderAdd}>
                    {role ? <CreateNewFolderIcon/> : <EmailIcon/>}
                    </IconButton>
                  </Grid>
                </Grid>
              </ThemeProvider>
               {/*Location*/}
              <Typography
                item xs={2}
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p">
                {location}.
                  </Typography>
              <Divider variant="middle" style={{"margin-bottom": 10}}/>
              <ThemeProvider item xs={3} theme={theme} style={{ "padding": 1 }}>
                {/* Label mapping with TechSkills */}
                <Grid
                  container
                  justify="space-evenly"
                  alignItems="center"
                  spacing={1}>
                  {skills.hard && skills.hard.map((techSkill, index) => (
                    (index < skillLimit) && <Chip className={classes.chips} size="small" color='primary' label={techSkill} />

                  ))}
                </Grid>
              <Divider style={{"margin-top":"20px"}} variant="fullWidth" />
              {/* Mini-Bio */}
              <Typography
                style={{ "margin-top": "20px" }}
                item xs={4} variant="body2"
                color="textPrimary"
                component="p">
                {miniBio.substring(0, 240) + '...'}
              </Typography>
              </ThemeProvider>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
  )
};

// Proptype checking for object USER that renders the card
CandidateCard.propTypes = {
  user: PropTypes.exact({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    location: PropTypes.string,
    skills: PropTypes.object,
    profilePicture: PropTypes.string,
    miniBio: PropTypes.string,
    linkedin: PropTypes.string,
    github: PropTypes.string
  }),
}

// Mock user for props received in CandidateCard
CandidateCard.defaultProps = {
  user: {
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
    linkedin: '/',
    github: 'https://github.com/henry-labs/talent'
  }
}

export default CandidateCard;