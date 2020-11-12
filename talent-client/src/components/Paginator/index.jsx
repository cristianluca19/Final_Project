import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { henryTheme, useStyles } from './styles';

export default function Paginator() {

    const classes = useStyles();

    return (
        <Grid className={classes.root}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <ThemeProvider theme={henryTheme}>
             <Pagination color="primary" count={10} variant="outlined" shape="rounded" />
            </ThemeProvider>
        </Grid>
    )
}