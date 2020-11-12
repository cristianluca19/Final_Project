import React from 'react';
import PropTypes from 'prop-types';
import { useStyles, theme } from './styles.js';
// import axios from 'axios';

// MUI Components
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import Chip from '@material-ui/core/Chip';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Divider from '@material-ui/core/Divider';
import EmailIcon from '@material-ui/icons/Email';
import imgtest from '../../images/cvtest.png';

function CandidateCard(props) {

  const { user } = props;

  const labelsMaxLimit = 8;

  const classes = useStyles();

  // HANDLERS //
  const handleFolderAdd = (event) => {
    //pending functionality
  }

  //pending improvement to responsive Grids

  return (
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={4}>
            {/*Profile Picture*/}
            <CardMedia
              className={classes.media}
              image={user.profilePicture || imgtest}
              title='Henry Candidate'
            />
          </Grid>
          <Grid
            item xs={8}
            container
            direction="column"
            justify="space-between"
            alignItems="stretch">
            <CardContent>
              <ThemeProvider theme={theme}>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center">
                  <Grid item xs={9}>
                    {/*FullName*/}
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2">
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                    {/*Top-right Icons*/}
                  </Grid>
                  <Grid item xs={1}>
                      <Link color="inherit" target="_blank" rel="noopener" href={user.github}>
                        <GitHubIcon name='GitHub' fontSize='small' />
                      </Link>
                  </Grid>
                  <Grid style={{ "paddingRight": "5px", "marginBottom":"-2px" }} item xs={1}>
                      <Link color="inherit" target="_blank" rel="noopener" href={user.linkedin}>
                        <LinkedInIcon name='LinkedIn' />
                      </Link>
                  </Grid>
                  <Grid item xs={1} style={{"paddingLeft": "5px"}}>
                    <IconButton color="secondary" edge='start' onClick={handleFolderAdd}>
                    {user.role ? <CreateNewFolderIcon/> : <EmailIcon/>}
                    </IconButton>
                  </Grid>
                </Grid>
              </ThemeProvider>
               {/*Location && Cohort*/}
              <Typography
                align="left"
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
                style={{paddingLeft:15}}>
                {`${user.country}  -  WebFT0${user.cohort}`}
                  </Typography>
              <Divider variant="middle" style={{"marginBottom": 10}}/>
              <ThemeProvider theme={theme}>
                {/* Label mapping with TechSkills */}
                <Grid
                  container
                  justify="space-evenly"
                  alignItems="center"
                  spacing={1}>
                    {/*skills.hard && skills.hard.map*/} 
                    {/* Arreglar esto cuando este listo el endpoint con skills..*/} 
                  {['JavaScript', 'React', 'Redux', 'HTML', 'CSS', 'SQL', 'Node', 'PHP'].map((techSkill, index) => (
                    (index < labelsMaxLimit) && 
                      <Chip key={index} className={classes.chips} 
                        size="small" 
                        color='primary' 
                        label={techSkill} />
                  ))}
                </Grid>
              <Divider style={{"marginTop":"20px"}} variant="fullWidth" />
              {/* Mini-Bio */}
              <Typography
                style={{ "marginTop": "20px" }}
                variant="body2"
                color="textPrimary"
                component="p"
                align="justify">
                {user.miniBio.substring(0, 180) + '...'}
              </Typography>
              </ThemeProvider>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
  )
};

CandidateCard.propTypes = {
  user: PropTypes.exact({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    country: PropTypes.string,
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