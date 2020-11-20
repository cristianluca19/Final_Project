import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSkills } from '../../redux/skillsReducer/Actions';
import { getModalStyle, useStyles } from './styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import { Input } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios';

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

  const dispatch = useDispatch();

  const [modalStyle] = useState(getModalStyle);
  const [allSkills, setAllSkills] = useState([]); // como hago esto????
  const [skillsSelected, setSkillsSelected] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [open, setOpen] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const getAllSkills = async (techSkills) => {
      const skills = await axios.get(`${BACKEND_URL}/skills/`);
      techSkills = skills.data.filter(skill => skill.type === "tech")
      setAllSkills(techSkills.map(skill => skill.name))
    }
    getAllSkills();
  }, [BACKEND_URL])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let tempArray = allSkills.slice()
  console.log(tempArray, "we")

  const handleSearchSkill = (e) => {
    setFilteredSkills(tempArray.filter(
        (skill) => skill.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    ));
  };

  const addSkill = (e) => {
    if (!skillsSelected.some((skill) => skill === e.target.value)) {
      setSkillsSelected((oldSkills) => [...oldSkills, e.target.value]);
      setAllSkills(allSkills.filter((skill) => skill !== e.target.value));
      setFilteredSkills(filteredSkills.filter((skill) => skill !== e.target.value))
    }
  };

  const removeSkill = (e) => {
    setSkillsSelected(
      skillsSelected.filter((skill) => skill !== e.target.value)
    );
    if (e.target.value) {
      setAllSkills((oldSkills) => [e.target.value, ...oldSkills]);
      setFilteredSkills((oldSkills) => [e.target.value, ...oldSkills]);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Technologies</h2>
      <FormControl className={classes.searchBar}>
        <InputLabel htmlFor="my-input">Search skill</InputLabel>
        <Input
          className={classes.input}
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={handleSearchSkill}
        />
      </FormControl>
      <div className={classes.generalDiv}>
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
        <div className={classes.divAllSkills}>
          {filteredSkills.length > 0 ?
          filteredSkills.slice(0, 10).map((skill, index) => (
            <div
              key={index}
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
            ))
          :
          allSkills.slice(0, 10).map((skill, index) => (
            <div
              key={index}
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
