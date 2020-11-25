import { Container, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { henryTheme } from '../../henryMuiTheme';
import Divider from '@material-ui/core/Divider';
import { useStyles } from './styles.js';
import { RecruiterForm } from './form';

function RecruiterCreate({ handleClose }) {
  return (
    <ThemeProvider theme={henryTheme}>
      <Container>
        <Typography color="primary" variant="h4">
          Agregar Recruiter
        </Typography>
        <Divider variant="middle" style={{ marginBottom: 10 }} />
        <RecruiterForm handleClose={handleClose}/>
      </Container>
    </ThemeProvider>
  );
}

export default RecruiterCreate;
