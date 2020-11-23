import React from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../images/logo.png';
import { Grid, Container, makeStyles, IconButton } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import AcountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import Menu from './menu.jsx';
import axios from 'axios';
import { newFolder } from '../../redux/foldersReducer/Action.js';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';

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
  link: {
    textDecoration: 'none',
    color: '#ffff00',
  },
});

function Nav({ location }) {
  const dispatch = useDispatch();
  const classes = useStyle();

  const HandleAddFolder = async (event) => {
    try {
      const nFolder = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/folders`
      );
      dispatch(newFolder(nFolder.data));
      return window.alert('Carpeta creada con éxito');
    } catch (error) {
      return window.alert(error.message);
    }
  };

  return (
    <nav>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid container item xs={3} sm={3} spacing={3}>
            <img className={classes.logo} alt="Henry Logo" src={logo} />
          </Grid>
          {!checkDossierRoute(location) && (
            <Grid container item xs={6} sm={6} spacing={3}>
              <Menu />
            </Grid>
          )}
          {!checkDossierRoute(location) && (
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
              <IconButton
                className={classes.icons}
                label="Folder"
                value="folder"
                onClick={HandleAddFolder}
              >
                <FolderIcon />
              </IconButton>
              <IconButton
                className={classes.icons}
                label="Setting"
                value="folder"
              >
                <Link to="/panel" className={classes.link}>
                  <Settings />
                </Link>
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Container>
    </nav>
  );
}

const checkDossierRoute = (url) => {
  if (url.slice(0, 9).toLowerCase() === '/dossier/') {
    return true;
  } else {
    return false;
  }
};

export default Nav;
