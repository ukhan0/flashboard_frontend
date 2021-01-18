import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material components
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: 10
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(0)
  },
  headingFont: {
    fontFamily: `'Libre Franklin', sans-serif`
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;

  return (
    <MuiDialogTitle
      id={'dialogHeading'}
      disableTypography
      className={classes.root}>
      <Typography
        id={'dialogTitle'}
        variant="h5"
        className={classes.headingFont}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          id={'closeDlgBtn'}
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function ModalClassic(props) {
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={props.size}
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
        keepMounted={props.keepMounted}>
        <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
          {props.title}
        </DialogTitle>

        <DialogContent dividers>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
}

ModalClassic.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.string,
  keepMounted: PropTypes.bool
};

ModalClassic.defaultProps = {
  size: 'lg',
  keepMounted: false
};
