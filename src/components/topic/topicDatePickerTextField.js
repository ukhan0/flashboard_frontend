import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';

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
  const [DateRangeFlag, setDateRangeFlag] = React.useState(false);
  const [state, setState] = React.useState({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    },
    compare: {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'compare'
    }
  });

  const { selection } = state;
  console.log(moment(selection.startDate).format('MMM Do YY'),"ajmal")

  return (
    <div>
      <Button
        style={{ backgroundColor: '#f5f5f5' }}
        variant="text"
        onClick={() => {
          setDateRangeFlag(true);
        }}>
        <span style={{backgroundColor:"white"}} >
          {` ${moment(selection.startDate).format('MMM Do YY')}`}
          { ' - ' }
          {`${moment(selection.endDate).format('MMM Do YY')} `}
        </span>
      </Button>
      {DateRangeFlag ? (
        <div
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            right: 0,
            top: 60,
            right: 20,
            zIndex: 1,
            border: '2px inset black'
          }}>
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
            />
          </form>
          <div style={{padding:10}}>
            <Button
              style={{ marginTop: 10, marginBottom: 5, marginLeft: 500 }}
              color="primary"
              variant="contained"
              onClick={() => {
                setDateRangeFlag(false);
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
