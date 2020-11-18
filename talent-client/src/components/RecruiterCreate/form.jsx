import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './styles.js';
import axios from 'axios';

const initialValues = {
  contactName: '',
  email: '',
  company: '',
  siteUrl: '',
};

export function RecruiterForm() {
  // TODO: Error handlers

  const [values, setValues] = useState(initialValues);
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/recruiters`, values)
      .then((response) => {
        return;
      })
      .catch((error) => {
        console.log(error);
        return;
      });
    return;
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <div>
        <TextField
          label="Nombre completo del contacto"
          variant="filled"
          fullWidth
          id={'contactName'}
          value={values.contactName}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          id={'email'}
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          label="Empresa"
          variant="outlined"
          fullWidth
          id={'company'}
          value={values.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          label="Web"
          variant="outlined"
          fullWidth
          id={'siteUrl'}
          value={values.sitUrl}
          onChange={handleChange}
        />
      </div>
      <Button
        className={classes.submitbtn}
        color="primary"
        variant="contained"
        type="submit"
        fullWidth
      >
        Crear Recruiter
      </Button>
    </form>
  );
}
