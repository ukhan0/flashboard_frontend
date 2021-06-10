import React from 'react';
import { MenuItem, Select, Checkbox, ListItemText, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedIndustries } from '../../reducers/Topic';
import sectorsData from '../../config/gicsData';
const useStyles = makeStyles(theme => ({
  multiSelect: {
    width: '100%',
    height: '2.2rem'
  }
}));

const TopicIndustryDropDown = props => {
  const classes = useStyles();
  const { selectedIndustries, selectedSector } = useSelector(state => state.Topic);
  const dispatch = useDispatch();

  const handleSelectionChange = (e) => {
    dispatch(setSelectedIndustries(e.target.value));
  };

  let sectorIndustries = [];
  const sector = sectorsData.find(sd => sd.value === selectedSector)
  if(sector) {
    sectorIndustries = sector.industries
  }


  return (
    <Select
      labelId="TopicIndustryDropDownLabel"
      id="TopicIndustryDropDownId"
      multiple
      value={selectedIndustries}
      onChange={handleSelectionChange}
      input={<Input />}
      renderValue={selectedValues => selectedValues.join(', ')}
      className={classes.multiSelect}>
      {sectorIndustries.map(ind => (
        <MenuItem key={ind} value={ind}>
          <Checkbox checked={selectedIndustries.indexOf(ind) > -1} />
          <ListItemText primary={ind} />
        </MenuItem>
      ))}
    </Select>
  );
};
export default TopicIndustryDropDown;
