import { Container, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { henryTheme } from '../../henryMuiTheme';
import Divider from '@material-ui/core/Divider';
import { useStyles } from './styles.js';
import {RecruiterForm} from './form';

function RecruiterCreate() {

  return (
    <Container>
      <ThemeProvider theme={henryTheme}>
        <Typography color='secondary' variant='h5'>Agregar un Recruiter</Typography>
        <Divider variant="middle" style={{ marginBottom: 10 }} />
        <RecruiterForm/>
      </ThemeProvider>
    </Container>
  )
}

export default RecruiterCreate;