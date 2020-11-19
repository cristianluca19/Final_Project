import React, { useState } from 'react';
import { useStyles } from './styles.js';
import Swal from 'sweetalert2'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';


function SkillsTable() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const skills = [{
    name: 'Javascript',
    type: 'hard',
    id: 1
  },
  {
    name: 'Leadership',
    type: 'soft',
    id: 2
  },
  {
    name: 'React',
    type: 'hard',
    id: 3
  }]
  const softSKills = skills.filter(item => item.type === 'soft')
  const hardSkills = skills.filter(item => item.type === 'hard')

  const handleOpen = (id) => {
    setOpen(true);
    //axios get skill by id
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
    if(alert.isConfirmed) {
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
        <h2 className={classes.title}>Hard Skills</h2>
        <div className={classes.listItems}>
          {hardSkills.map(item =>
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
                        <option value="Hard">Hard</option>
                        <option value="Soft">Soft</option>
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
        <div className={classes.listItems}>
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
                        <option value="Hard">Hard</option>
                        <option value="Soft">Soft</option>
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

