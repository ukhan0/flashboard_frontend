import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchDateRange } from '../../reducers/Topic';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dateSelection: {
    textAlign: 'right',
    padding: 10,
    backgroundColor: '#7092e6',
    color: 'white',
    borderRadius: 12,
    cursor: 'pointer',
  },
  dateRangeSelector: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 76,
    right: 9,
    zIndex: 1,
    border: '1px solid black',
    padding: 10,
    width: '20rem',
  },
  dateRangeSelectorControls: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 25,
  }
}));

const TopicDatePickerTextField = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isDateRangeSelectorOpen, setIsDateRangeSelectorOpen] = React.useState(false);
  const { startDate, endDate } = useSelector(state => state.Topic);
  const dateFormat = 'MMMM yyyy';


  const handleStartDateChange = (newStartDate) => {
    console.log(newStartDate)
    dispatch(setTopicSearchDateRange({startDate: startOfMonth(newStartDate), endDate: endDate}))
  }

  const handleEndDateChange = (newEndDate) => {
    console.log(newEndDate)
    dispatch(setTopicSearchDateRange({startDate: startDate, endDate: endOfMonth(newEndDate)}))
  }

  return (
    <div>
      <div
        className={classes.dateSelection}
        onClick={() => {
          setIsDateRangeSelectorOpen(true);
        }}>
        <span className='font-weight-bold'>{format(startDate, dateFormat)}</span>
        <span className='text-white'>{ '  -  ' }</span>
        <span className='font-weight-bold'>{format(endDate, dateFormat)} </span>
      </div>
      {isDateRangeSelectorOpen ? (
        <div className={classes.dateRangeSelector}>
          <div className={classes.container}>
            <KeyboardDatePicker 
              value={startDate} 
              onChange={handleStartDateChange}
              label="Start Date"
              format={dateFormat}
              views={["year", "month"]}
            />
            <div className='mb-2'></div>
            <KeyboardDatePicker 
              value={endDate}
              onChange={handleEndDateChange}
              label="End Date"
              format={dateFormat}
              views={["year", "month"]}
            />
          </div>
          <div className={classes.dateRangeSelectorControls}>
            <Button
              color="primary"
              onClick={() => {
                setIsDateRangeSelectorOpen(false);
              }}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default TopicDatePickerTextField;
