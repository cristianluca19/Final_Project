import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './styles.js';
import Swal from 'sweetalert2'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { getAllSkills } from '../../redux/skillsReducer/Action'
import { useDispatch } from 'react-redux';


function SkillsTable() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const classes = useStyles();
  const dispatch = useDispatch();
  const skills = useSelector(
    (store) => store.SkillsReducer.allSkills
  );
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState({
    id: null,
    name: null,
    type: null
  })

  const softSKills = skills.filter(item => item.type === 'soft');
  let soft;
  softSKills.length > 5 ? soft = classes.softListScroll : soft = classes.softListItems

  const techSkills = skills.filter(item => item.type === 'tech');
  let tech;
  techSkills.length > 5 ? tech = classes.techListScroll : tech = classes.techListItems

  const otherSkills = skills.filter(item => item.type === 'other');
  let other;
  otherSkills.length > 5 ? other = classes.otherListScroll : other = classes.otherListItems


  const handleOpen = async (id) => {
    const resp = await axios.get(`${BACKEND_URL}/skills/${id}`);
    await setSkill({
      id: resp.data.id,
      name: resp.data.name,
      type: resp.data.type
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const alert = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if (alert.isConfirmed) {
      const resp = await axios.delete(`${BACKEND_URL}/skills/${id}`);
      console.log(resp.data)
      if (resp.data === 'Skill deleted') {
        await Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        dispatch(getAllSkills());
      }
    }
  }

  const handleInput = (e) => {
    setSkill({
      ...skill,
      name: e.target.value
    })
  }

  const handleSelect = (e) => {
    setSkill({
      ...skill,
      type: e.target.value
    })
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    let json = {
      name: skill.name,
      type: skill.type,
    }
    const resp = await axios.put(`${BACKEND_URL}/skills/${skill.id}`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (resp.data.id) {
      handleClose();
      await Swal.fire('Skill edited successfully!');
      dispatch(getAllSkills());
    }
  }


  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <h2 className={classes.title}>Tech Skills</h2>
        <div className={tech}>
          {techSkills.map(item =>
            <div className={classes.listItem}>
              <p className={classes.text}>{item.name}</p>
              <div className={classes.iconContainer}>
                <EditIcon className={classes.icon} onClick={() => {
                  handleOpen(item.id);
                }} />
                <DeleteIcon className={classes.icon} onClick={() => {
                  handleDelete(item.id)
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={classes.list}>
        <h2 className={classes.title}>Soft Skills</h2>
        <div className={soft}>
          {softSKills.map(item =>
            <div className={classes.listItem}>
              <p className={classes.text}>{item.name}</p>
              <div className={classes.iconContainer}>
                <EditIcon className={classes.icon} onClick={() => {
                  handleOpen(item.id);
                }} />
                <DeleteIcon className={classes.icon} onClick={() => {
                  handleDelete(item.id)
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={classes.list}>
        <h2 className={classes.title}>Other Skills</h2>
        { }
        <div className={other}>
          {otherSkills.map(item =>
            <div className={classes.listItem}>
              <p className={classes.text}>{item.name}</p>
              <div className={classes.iconContainer}>
                <EditIcon className={classes.icon} onClick={() => {
                  handleOpen(item.id);
                }} />
                <DeleteIcon className={classes.icon} onClick={() => {
                  handleDelete(item.id)
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className={classes.modal}>
          <h1>Editar Skill</h1>
          <div className={classes.form}>
            <label className={classes.label}>Nombre:</label>
            <input className={classes.input} type='text' name='name' value={skill.name} onChange={handleInput} />
            <label for='type' className={classes.label}>Tipo:</label>
            <select className={classes.input} name='type' id='type' value={skill.type} onChange={handleSelect}>
              <option value="tech">Tech</option>
              <option value="soft">Soft</option>
              <option value="other">Other</option>
            </select>
            <input type='submit' className={classes.button} value='Guardar Cambios' onClick={handleEdit} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SkillsTable

