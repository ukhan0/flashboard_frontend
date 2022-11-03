import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterLabel, setIsFilterUpdate } from '../../reducers/Watchlist';
const useStyles = makeStyles(theme => ({
  dialog: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  paper: {
    minWidth: '600px'
  }
}));

export default function AlertDialog(props) {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const { filterLabel, isFilterUpdate } = useSelector(state => state.Watchlist);
  const classes = useStyles();

  React.useEffect(() => {
    setText(filterLabel);
  }, [filterLabel]);
  const hanldeFilterLabel = e => {
    if (text.length <= 30) {
      setText(e.target.value);
    }
  };
  return (
    <div>
      <Dialog
        open={props.isFilterLabelOpen}
        onClose={() => {
          props.handleCloseAgGridFilterLabelDialog();
        }}
        classes={{ paper: classes.paper }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Screen Name</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              size="small"
              fullWidth
              value={text}
              onChange={e => {
                hanldeFilterLabel(e);
              }}
              variant="outlined"
              helperText={text.length > 30 ? 'The maximum number of characters is 30' : null}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={text.length > 2 ? false : true}
            style={{ width: '100px' }}
            variant="contained"
            color="primary"
            onClick={() => {
              if (isFilterUpdate) {
                props.updateFilter(text);
              } else {
                props.saveFilter(text);
              }
              dispatch(setIsFilterUpdate(false));
              dispatch(setFilterLabel(text));
              setText('');
            }}>
            Save
          </Button>

          <Button
            style={{ width: '100px' }}
            variant="contained"
            color="primary"
            onClick={() => {
              props.handleCloseAgGridFilterLabelDialog();
              if (!isFilterUpdate) {
                setText('');
              }
            }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
