import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { startOfMonth, endOfMonth } from 'date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchDateRange, isDateSet } from '../../reducers/Topic';
import moment from 'moment';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    backgroundColor: 'white'
    // width:'30px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dateSelection: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: 12,
    cursor: 'pointer',
    width: '200px'
  },
  dateSelectionDisabled: {
    backgroundColor: theme.palette.text.disabled,
    userSelect: 'none',
    cursor: 'default'
  },
  dateRangeSelector: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 76,
    right: 9,
    zIndex: 1,
    border: '1px solid black',
    padding: 10,
    width: '20rem'
  },
  dateRangeSelectorControls: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 25
  }
}));

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const TopicRangePicker = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isDateRangeSelectorOpen, setIsDateRangeSelectorOpen] = React.useState(false);
  const { startDate, endDate, searchIndex } = useSelector(state => state.Topic);
  const inputDateFormat = 'MM-yyyy';
  const displayDateFormat = 'MMM yyyy';
  const disabled = searchIndex['id'] === 4 ? true : false;

  const handleStartDateChange = newStartDate => {
    if (isValidDate(newStartDate)) {
      dispatch(setTopicSearchDateRange({ startDate: startOfMonth(newStartDate), endDate: endDate }));
      dispatch(isDateSet(true));
    }
  };

  const handleEndDateChange = newEndDate => {
    if (isValidDate(newEndDate)) {
      dispatch(setTopicSearchDateRange({ startDate: startDate, endDate: endOfMonth(newEndDate) }));
      dispatch(isDateSet(true));
    }
  };

  const urlStartDate = new URLSearchParams(window.location.search).get('startDate');
  const urlEndDate = new URLSearchParams(window.location.search).get('endDate');
  useEffect(() => {
    if (urlStartDate && urlEndDate) {
      dispatch(
        setTopicSearchDateRange({
          startDate: urlStartDate,
          endDate: urlEndDate
        })
      );
    }
  }, [dispatch, urlStartDate, urlEndDate]);

  return (
    <div>
      <div
        className={clsx(classes.dateSelection, disabled ? classes.dateSelectionDisabled : null)}
        onClick={() => {
          !disabled && setIsDateRangeSelectorOpen(true);
        }}>
        <span className="font-weight-bold">{moment(startDate).format(displayDateFormat)}</span>
        <span className="text-white">{'  -  '}</span>
        <span className="font-weight-bold">{moment(endDate).format(displayDateFormat)} </span>
      </div>
      {isDateRangeSelectorOpen ? (
        <div className={classes.dateRangeSelector}>
          <div className={classes.container}>
            <KeyboardDatePicker
              value={startDate}
              onChange={handleStartDateChange}
              label="Start Date"
              format={inputDateFormat}
              views={['year', 'month']}
            />
            <div className="mb-2"></div>
            <KeyboardDatePicker
              value={endDate}
              onChange={handleEndDateChange}
              label="End Date"
              format={inputDateFormat}
              views={['year', 'month']}
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

export default TopicRangePicker;
