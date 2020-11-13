import { Menu } from '@material-ui/core';
import React from 'react';
import { useStyle }  from './Styles/index.css.js';

function Dashboard() {

    const classes = useStyle();

    return (
        <div className={ classes.dashboardMain }></div>
    );
};

export default Dashboard;