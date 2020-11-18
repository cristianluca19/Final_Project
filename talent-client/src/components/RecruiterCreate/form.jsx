import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './styles.js';
import axios from 'axios';
import { ThemeProvider, Typography } from '@material-ui/core';
import { henryTheme } from '../../henryMuiTheme.js';

const initialValues = {
  contactName: '',
  email: '',
  company: '',
  siteUrl: '',
};

export function RecruiterForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(true);
  const classes = useStyles();

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.id]: event.target.value });
    setErrors(validate({ ...values, [event.target.id]: event.target.value }));
  };

  const validate = (input) => {
    let errors = {};
    if (!input.contactName) {
      errors.contactName = 'Este campo es requerido';
    }
    if (!input.company) {
      errors.company = 'Este campo es requerido';
    }
    if (!input.siteUrl) {
      errors.siteUrl = 'Este campo es requerido';
    }
    if (!input.email) {
      errors.email = 'Este campo es requerido';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
      errors.email = 'Ingresar un formato de e-mail válido';
    }
    return errors;
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
        {errors.contactName ? (
          <TextField
            error
            label="Nombre completo del contacto"
            variant="filled"
            helperText="Campo Requerido"
            fullWidth
            id={'contactName'}
            value={values.contactName}
            onChange={handleChange}
          />
        ) : (
          <TextField
            label="Nombre completo del contacto"
            variant="filled"
            fullWidth
            id={'contactName'}
            value={values.contactName}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        {errors.email ? (
          <TextField
            error
            label="Email"
            variant="filled"
            helperText="Campo Requerido"
            fullWidth
            id={'email'}
            value={values.email}
            onChange={handleChange}
          />
        ) : (
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            id={'email'}
            value={values.email}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        {errors.company ? (
          <TextField
            error
            label="Empresa"
            helperText="Campo Requerido"
            variant="filled"
            fullWidth
            id={'company'}
            value={values.company}
            onChange={handleChange}
          />
        ) : (
          <TextField
            label="Empresa"
            variant="filled"
            fullWidth
            id={'company'}
            value={values.company}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        {errors.siteUrl ? (
          <TextField
            error
            label="Web"
            helperText="Campo Requerido"
            variant="filled"
            fullWidth
            id={'siteUrl'}
            value={values.sitUrl}
            onChange={handleChange}
          />
        ) : (
          <TextField
            label="Web"
            variant="filled"
            fullWidth
            id={'siteUrl'}
            value={values.sitUrl}
            onChange={handleChange}
          />
        )}
      </div>
      <ThemeProvider theme={henryTheme}>
        {!errors || JSON.stringify(errors) !== JSON.stringify({}) ? (
          <Button
            disabled
            className={classes.submitbtn}
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
          >
            Crear Recruiter
          </Button>
        ) : (
          <Button
            className={classes.submitbtn}
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
          >
            Crear Recruiter
          </Button>
        )}
      </ThemeProvider>
    </form>
  );
}
