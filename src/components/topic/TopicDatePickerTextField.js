import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { format } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchDateRange } from '../../reducers/Topic';
// import moment from 'moment';

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
  const dispatch = useDispatch();
  const [isDateRangeSelectorOpen, setIsDateRangeSelectorOpen] = React.useState(false);
  const { startDate, endDate } = useSelector(state => state.Topic);
  const [dateRange, setDateRange] = React.useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }
  ]);

  const handleDateChange = (item) => {
    setDateRange([item.selection])
    dispatch(setTopicSearchDateRange({startDate: item.selection.startDate, endDate: item.selection.endDate}))
  }

  return (
    <div>
      <Button
        style={{ backgroundColor: '#f5f5f5'}}
        variant="text"
        onClick={() => {
          setIsDateRangeSelectorOpen(true);
        }}>
        <span style={{backgroundColor: "white",paddingLeft: 5, paddingRight: 5 }} >
          {format(dateRange[0].startDate, 'dd MMM yy')}
          { ' - ' }
          {format(dateRange[0].endDate, 'dd MMM yy')}
        </span>
      </Button>
      {isDateRangeSelectorOpen ? (
        <div
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            top: 60,
            right: 20,
            zIndex: 1,
            border: '2px inset black'
          }}>
          <form className={classes.container} noValidate>
          <DateRangePicker
            editableDateInputs={true}
            onChange={handleDateChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={dateRange}
            direction="horizontal"
          />
          </form>
          <div style={{padding:10}}>
            <Button
              style={{ marginTop: 10, marginBottom: 5, marginLeft: 500 }}
              color="primary"
              variant="contained"
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
