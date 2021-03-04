import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const TopicDatePickerTextField = props => {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
           <KeyboardDatePicker
            disableToolbar
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
      </MuiPickersUtilsProvider>
  );
};
export default TopicDatePickerTextField;
