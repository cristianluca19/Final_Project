import React from 'react';
import logo from '../../images/logo.png';
import { Grid, Container, makeStyles, IconButton } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import AcountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import Menu from './menu.jsx';

const useStyle = makeStyles({
  logo: {
    padding: '50px 0px',
  },
  icons: {
    color: '#ffff00',
    maxWidth: '120px',
  },
  containerIcons: {
    justifyContent: 'flex-end',
  },
});

function Nav() {
  const classes = useStyle();

  return (
    <nav>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid container item xs={3} sm={3} spacing={3}>
            <img className={classes.logo} src={logo} />
          </Grid>
          <Grid container item xs={6} sm={6} spacing={3}>
            <Menu />
          </Grid>
          <Grid
            className={classes.containerIcons}
            container
            item
            xs={3}
            sm={3}
            spacing={1}
          >
            <IconButton
              className={classes.icons}
              label="Acount Circle"
              value="folder"
            >
              <AcountCircle />
            </IconButton>
            <IconButton className={classes.icons} label="Folder" value="folder">
              <FolderIcon />
            </IconButton>
            <IconButton
              className={classes.icons}
              label="Setting"
              value="folder"
            >
              <Settings />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </nav>
  );
}

export default Nav;
