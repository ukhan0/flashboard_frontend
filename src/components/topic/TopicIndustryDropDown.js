import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
  const handleSelectionChange = e => {
    dispatch(setSelectedIndustries(e.target.value));
  };

  let sectorIndustries = [];
  const sector = sectorsData.find(sd => sd.value === selectedSector);
  if (sector) {
    sectorIndustries = sector.industries;
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
