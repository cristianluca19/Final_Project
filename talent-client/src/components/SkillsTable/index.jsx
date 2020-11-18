import React, { useState } from 'react';
import { useStyles } from './styles.js';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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
                    <div>
                      <input type='text' name='name' />
                      <input type='submit' />
                    </div>
                  </div>
                </Modal>
                <DeleteIcon className={classes.icon} onClick={handleOpen} />
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
              <MoreHorizIcon className={classes.icon} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkillsTable

