import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './styles.js';
import Swal from 'sweetalert2'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';


function SkillsTable() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const classes = useStyles();
  const skills = useSelector(
    (store) => store.SkillsReducer.allSkills
  );
  const [open, setOpen] = useState(false);
  const [skill, setSkill] = useState({
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


  const handleOpen = async(id) => {
    const resp = await axios.get(`${BACKEND_URL}/skills/${id}`);
    await setSkill({
      name: resp.data.name,
      type: resp.data.type
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
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
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
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
                <Modal
                  open={open}
                  onClose={handleClose}
                >
                  <div className={classes.modal}>
                    <h1>Editar Skill</h1>
                    <div className={classes.form}>
                      <label className={classes.label}>Nombre:</label>
                      <input className={classes.input} type='text' name='name' value='holaaa' />
                      <label for='type' className={classes.label}>Tipo:</label>
                      <select className={classes.input} name='type' id='type' value={skill.type}>
                        <option value="tech">Tech</option>
                        <option value="toft">Soft</option>
                        <option value="other">Other</option>
                      </select>
                      <input type='submit' className={classes.button} value='Guardar Cambios' />
                    </div>
                  </div>
                </Modal>
                <DeleteIcon className={classes.icon} onClick={handleDelete} />
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
                <Modal
                  open={open}
                  onClose={handleClose}
                >
                  <div className={classes.modal}>
                    <h1>Editar Skill</h1>
                    <div className={classes.form}>
                      <label className={classes.label}>Nombre:</label>
                      <input className={classes.input} type='text' name='name' />
                      <label for='type' className={classes.label}>Tipo:</label>
                      <select className={classes.input} name='type' id='type'>
                        <option value="Tech">Hard</option>
                        <option value="Soft">Soft</option>
                        <option value="Other">Other</option>
                      </select>
                      <input type='submit' className={classes.button} value='Guardar Cambios' />
                    </div>
                  </div>
                </Modal>
                <DeleteIcon className={classes.icon} onClick={handleDelete} />
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
                <Modal
                  open={open}
                  onClose={handleClose}
                >
                  <div className={classes.modal}>
                    <h1>Editar Skill</h1>
                    <div className={classes.form}>
                      <label className={classes.label}>Nombre:</label>
                      <input className={classes.input} type='text' name='name' />
                      <label for='type' className={classes.label}>Tipo:</label>
                      <select className={classes.input} name='type' id='type'>
                        <option value="Tech">Hard</option>
                        <option value="Soft">Soft</option>
                        <option value="Other">Other</option>
                      </select>
                      <input type='submit' className={classes.button} value='Guardar Cambios' />
                    </div>
                  </div>
                </Modal>
                <DeleteIcon className={classes.icon} onClick={handleDelete} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkillsTable

