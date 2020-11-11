import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    ulList: {
        color: '#ffffff',
        display: 'inline-flex',
        alignItems: 'center'
    },
    liList: {
        listStyle: 'none',
        padding: '0px 25px',
        fontSize: '18px'
    }
})

function Menu() {

    const classes = useStyle();

    return (
        <Grid container item xs={12} spacing={3}>
            <ul className={classes.ulList}>
                <li className={classes.liList}>Home</li>
                <li className={classes.liList}>Candidates</li>
                <li className={classes.liList}>Skills</li>
                <li className={classes.liList}>Recruiters</li>
                <li className={classes.liList}>Contact</li>
            </ul>
        </Grid>
    );
};

export default Menu;