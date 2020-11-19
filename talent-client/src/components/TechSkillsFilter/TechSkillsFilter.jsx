import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStyle, useStyles } from './styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const skillsArray = [
  'PHP',
  'Python',
  'JavaScript',
  'Java',
  'Rust',
  'Node js',
  'React',
  'Redux',
  'Express js',
  'Laravel',
  'Next js',
  '.Net',
  'C++',
  'Angular',
];

const TechSkillsFilter = () => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [allSkills, setAllSkills] = useState([]);
  const [skillsSelected, setSkillsSelected] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setAllSkills(skillsArray);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchSkill = (e) => {
    setAllSkills(
      skillsArray.filter(
        (skill) => skill.toLowerCase().indexOf(e.target.value) > -1
      )
    );
  };

  const addSkill = (e) => {
    if (!skillsSelected.some((skill) => skill === e.target.value)) {
      setSkillsSelected((oldSkills) => [...oldSkills, e.target.value]);
      setAllSkills(allSkills.filter((skill) => skill !== e.target.value));
    }
  };

  const removeSkill = (e) => {
    setSkillsSelected(
      skillsSelected.filter((skill) => skill !== e.target.value)
    );
    if (e.target.value) {
      setAllSkills((oldSkills) => [e.target.value, ...oldSkills]);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Technologies</h2>
      <FormControl className={classes.searchBar}>
        <InputLabel htmlFor="my-input">Search skill</InputLabel>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleSearchSkill}
        />
      </FormControl>
      <div>
        <div>
          {skillsSelected &&
            skillsSelected.map((skill, index) => (
              <div key={index} style={{ float: 'left' }}>
                <button
                  className={classes.yellowButton}
                  style={{ backgroundColor: 'yellow' }}
                  onClick={removeSkill}
                  value={skill}
                >
                  {skill}
                  <span className={classes.checkIcon}>
                    <CheckIcon />
                  </span>
                </button>
              </div>
            ))}
        </div>
        <div>
          {allSkills.slice(0, 10).map((skill, index) => (
            <div
              key={index}
              className={classes.blackButton}
              style={{
                margin: '10px',
                float: 'left',
              }}
            >
              <button
                className={classes.blackButton}
                onClick={addSkill}
                value={skill}
              >
                {skill}
              </button>
            </div>
          ))}
        </div>
      </div>
      <button className={classes.yellowButton}>Add skill</button>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Tech Skills
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default TechSkillsFilter;
