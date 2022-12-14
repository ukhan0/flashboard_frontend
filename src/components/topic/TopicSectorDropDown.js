import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSector, setSelectedIndustries } from '../../reducers/Topic';
import sectors from '../../config/gicsData';

const useStyles = makeStyles(theme => ({
  singleSelect: {
    width: '100%',
    height: '2.2rem'
  }
}));

const TopicSectorDropDown = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { selectedSector } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelectionChange = e => {
    dispatch(setSelectedSector(e.target.value));
    dispatch(setSelectedIndustries([]));
  };

  const sectorValues = sectors.map(s => s.value);

  return (
    <Select
      labelId="topicSectorDropdown"
      id="topicSectorDropdown"
      value={selectedSector === null ? '' : selectedSector}
      onChange={handleSelectionChange}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      input={<Input />}
      className={classes.singleSelect}>
      {sectorValues.map(sector => (
        <MenuItem key={sector} value={sector}>
          <ListItemText primary={sector} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default TopicSectorDropDown;
