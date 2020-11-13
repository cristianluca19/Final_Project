import React from 'react';
import { useStyle } from './Styles/menu.css.js';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

function Menu() {
  const classes = useStyle();

  return (
    <div className={classes.dashboardSidebar}>
      <img className={classes.logo} src={logo} />
      <ul className={classes.ulMenu}>
        <Link to="/panel/candidates" className={classes.linkCandidate}>
          <li className={classes.liMenu}>Candidates</li>
        </Link>
        <Link to="/panel/recruiter" className={classes.linkRecruiter}>
          <li className={classes.liMenu}>Recruiter</li>
        </Link>
        <Link to="/panel/skills" className={classes.linkSkills}>
          <li className={classes.liMenu}>Skills</li>
        </Link>
      </ul>
    </div>
  );
}

export default Menu;
