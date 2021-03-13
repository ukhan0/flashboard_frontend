import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { TextField, Button } from '@material-ui/core';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const TopicDatePickerTextField = props => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    selection: {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    },
    compare: {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'compare'
    }
  });

  const { selection, compare } = state;
  console.log('ajmal', compare.startDate, compare.endDate);

  return (
    <div style={{ backgroundColor: 'grey', padding: '10' }}>
      <form className={classes.container} noValidate>
        <DateRangePicker
          onChange={item => {
            console.log(item.selection);
            setState({ ...state, ...item });
          }}
          value={3}
          months={1}
          minDate={addDays(new Date(), -300)}
          maxDate={addDays(new Date(), 900)}
          direction="vertical"
          scroll={{ enabled: true }}
          ranges={[state.selection, state.compare]}
          customCloseIcon={<Button>Close</Button>}
        />
      </form>
    </div>
  );
};
export default TopicDatePickerTextField;
