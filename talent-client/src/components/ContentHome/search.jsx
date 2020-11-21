import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { useStyle } from './Styles/search.css.js';
import {
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
  InputLabel,
  FormControl,
  Select,
  Button,
} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import { getAllSkills } from '../../redux/skillsReducer/Action';
import { getFilterCandidates } from '../../redux/candidatesReducer/Action';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      height: ITEM_HEIGHT * 7.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Search() {
  const candidates = useSelector(
    (store) => store.CandidateReducer.allCandidates
  );
  const allSkills = useSelector((store) => store.SkillsReducer.allSkills);
  const dispatch = useDispatch();
  const classes = useStyle();
  const [statusFilter, setStatusFilter] = React.useState({
    skills: [],
    cohorts: [],
    locations: [],
  });
  const skills =
    allSkills &&
    Array.from(new Set(allSkills.map((dataSkill) => dataSkill.name)));
  const locations = Array.from(
    new Set(candidates.map((dataCandidate) => dataCandidate.country))
  );
  const cohorts = Array.from(
    new Set(candidates.map((dataCohort) => dataCohort.cohort))
  );

  
  useEffect(() => {
    if (!allSkills.length) dispatch(getAllSkills());
  }, [candidates, allSkills]);

  const handleChange = (e, statusName) => {
    setStatusFilter({
      ...statusFilter,
      [statusName]: e.target.value,
    });
  };

  const onClickFilter = (e) => {
    e.preventDefault();
    let filter = '';
    if (statusFilter.locations.length > 1) {
      filter +=
        'locations=' + statusFilter.locations.join().replace(/,/g, '%2C') + '&';
    } else {
      if (statusFilter.locations.length) {
        filter += 'locations=' + statusFilter.locations.join() + '&';
      }
    }
    if (statusFilter.skills.length > 1) {
      filter +=
        'skills=' + statusFilter.skills.join().replace(/,/g, '%2C') + '&';
    } else {
      if (statusFilter.skills.length) {
        filter += 'skills=' + statusFilter.skills.join() + '&';
      }
    }
    if (statusFilter.cohorts.length > 1) {
      filter += 'cohorts=' + statusFilter.cohorts.join().replace(/,/g, '%2C');
    } else {
      if (statusFilter.cohorts.length) {
        filter += 'cohorts=' + statusFilter.cohorts.join();
      }
    }
    dispatch(getFilterCandidates(filter));
  };

  const formSelectFilter = () => (
    <div className={classes.formSelectFilter}>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-locations" className={classes.inputLabel}>
          Locations
        </InputLabel>
        <Select
          labelId="select-label-locatios"
          id="select-id-locations"
          className={classes.inputSelectData}
          multiple
          value={statusFilter.locations}
          onChange={(e) => handleChange(e, 'locations')}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {locations.length &&
            locations.sort().map((location) => (
              <MenuItem key={location} value={location}>
                <Checkbox
                  checked={statusFilter.locations.indexOf(location) > -1}
                />
                <ListItemText primary={location} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-skills" className={classes.inputLabel}>
          Skills
        </InputLabel>
        <Select
          labelId="select-label-skills"
          id="select-id-skills"
          className={classes.inputSelectData}
          multiple
          value={statusFilter.skills}
          onChange={(e) => handleChange(e, 'skills')}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {skills.length &&
            skills.sort().map((skill) => (
              <MenuItem key={skill} value={skill}>
                <Checkbox checked={statusFilter.skills.indexOf(skill) > -1} />
                <ListItemText primary={skill} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-cohorts" className={classes.inputLabel}>
          Cohort
        </InputLabel>
        <Select
          labelId="select-label-cohorts"
          id="select-id-cohort"
          className={classes.inputSelectData}
          multiple
          value={statusFilter.cohorts}
          onChange={(e) => handleChange(e, 'cohorts')}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {cohorts.length &&
            cohorts.sort().map((cohort) => (
              <MenuItem key={cohort} value={cohort}>
                <Checkbox checked={statusFilter.cohorts.indexOf(cohort) > -1} />
                <ListItemText primary={cohort} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );

  return (
    <div>
      {formSelectFilter()}
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<SearchIcon />}
        onClick={onClickFilter}
      >
        Buscar
      </Button>
    </div>
  );
}

export default Search;
