import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Container, IconButton } from '@material-ui/core/';
import imgtest from '../../img/cvtest.png';
import { yellow } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
      maxHeigth: 300,
    },
    media: {
      height: "100%",
      width: "100%",
      borderRight: '5px black',
    },
    spacingBot: {
      borderBottom: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    }
  }));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow['A200'],
    },
    secondary: {
      main: '#000',
    },
  },
});

function CandidateCard () {

    const classes = useStyles();

    return (
      <Container style={{"margin-top": "200px"}}>
        <Card className={classes.root}>
          <Grid container>
            <Grid item xs={4}>
            {/* <CardActionArea> */}
              <CardMedia
                className={classes.media}
                image={imgtest}
                title="Contemplative Reptile"
              />
            </Grid>
              <Grid item xs={8} container direction="column" justify="flex-end" alignItems="stretch">
              <CardContent>
                {/* <Grid direction="column" item xs={3}> */}
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={8}>
                      <Typography gutterBottom variant="h5" component="h2">
                      Daniel Stadler 
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <ThemeProvider theme={theme}>
                          <IconButton color="Secondary" edge='end' >
                            <CreateNewFolderIcon/>
                          </IconButton>
                      </ThemeProvider>
                    </Grid>
                  </Grid>
                {/* </Grid> */}
                  <Typography className={classes.spacingBot} item xs={2} gutterBottom variant="body2" color="textSecondary" component="p">
                  Location: Sarasota, TX, USA.
                  </Typography>  
                  <ThemeProvider item xs={3} theme={theme}>
                    <Button color="primary" variant="contained">Javascript</Button> <Button variant="contained" color="primary">React</Button> <Button variant="contained" color="primary">Redux</Button>
                  </ThemeProvider>
                  <Typography item xs={4} variant="body2" color="textPrimary" component="p">{`
                  I'm a software engineer who believes that out-of-the-box thinking is what
                   separates a great project from a good one. I do most of mine in Javascript, 
                   React, Node.js and Python.`}
                  </Typography>    
              </CardContent>  
            </Grid>
            {/* </CardActionArea> */}
          {/* <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions> */}
          </Grid>
        </Card>
      </Container>
    )
};

export default CandidateCard;