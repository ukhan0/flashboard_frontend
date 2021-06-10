import React from 'react';
import { MenuItem, Select, ListItemText, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSector } from '../../reducers/Topic';
import sectors from '../../config/gicsData'

const useStyles = makeStyles(theme => ({
  singleSelect: {
    width: '100%',
    height: '2.2rem',
  },
}));

const TopicSectorDropDown = props => {
  const classes = useStyles()
  const { selectedSector } = useSelector(state => state.Topic);
  const dispatch = useDispatch();

  
  const handleSelectionChange = (e) => {
    let value = e.target.value
    if(value === 'all') {
      value = null
    }
    dispatch(setSelectedSector(value))
  }
  
  const sectorValues = sectors.map(s => s.value)

  return (
    <Select
      labelId="topicSectorDropdown"
      id="topicSectorDropdown"
      value={selectedSector === null ? 'all' : selectedSector}
      onChange={handleSelectionChange}
      input={<Input />}
      className={classes.singleSelect}
    >
      <MenuItem value={'all'}>
        <ListItemText primary={'All'} />
      </MenuItem>
      {sectorValues.map(sector => (
        <MenuItem key={sector} value={sector}>
          <ListItemText primary={sector} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default TopicSectorDropDown;
