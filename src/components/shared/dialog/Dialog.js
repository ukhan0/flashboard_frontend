import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchPhraseType } from '../../../reducers/Topic';

// Material components
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const styles = theme => ({
  root: {
    margin: 0,
    padding: 15
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
  const { children, classes, onClose, closeBtnComponent, titleVariant, titleColor } = props;

  return (
    <MuiDialogTitle id={'dialogHeading'} disableTypography className={classes.root}>
      <Typography
        style={{ color: titleColor ? titleColor : null }}
        id={'dialogTitle'}
        variant={titleVariant ? titleVariant : 'h5'}
        className={classes.headingFont}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton id={'closeDlgBtn'} aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
      {closeBtnComponent ? closeBtnComponent : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const searchPhraseTypes = ['ANY', 'ALL'];
export default function GenericDialog(props) {
  const { phraseType } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const [searchPhraseTypeState, setSearchPhraseTypeState] = useState(phraseType);
  const selectPhraseType = index => {
    dispatch(setSearchPhraseType(searchPhraseTypes[index]));
    setSearchPhraseTypeState(searchPhraseTypes[index]);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={props.size}
        onClose={props.onClose}
        aria-labelledby="customized-dialog-title"
        open={props.isOpen}
        keepMounted={props.keepMounted}>
        <DialogTitle
          id="customized-dialog-title"
          onClose={props.onClose}
          closeBtnComponent={props.closeBtnComponent}
          titleVariant={props.titleVariant}
          titleColor={props.titleColor}>
          <div style={{ justifyContent: 'flex-start', display: 'flex' }}>
            <div
              style={{
                position: 'relative',
                top: '8px',
                fontWeight: 'bold',
                paddingRight: '10px'
              }}>
              {props.title}
            </div>
            <ButtonGroup color="primary" size="small">
              {searchPhraseTypes.map((item, index) => {
                return (
                  <Button
                    variant={item === searchPhraseTypeState ? 'contained' : 'outlined'}
                    onClick={() => selectPhraseType(index)}>
                    {item}
                  </Button>
                );
              })}
            </ButtonGroup>
          </div>
        </DialogTitle>

        <DialogContent dividers>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
}

GenericDialog.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  size: PropTypes.string,
  keepMounted: PropTypes.bool,
  closeBtnComponent: PropTypes.object
};

GenericDialog.defaultProps = {
  size: 'lg',
  keepMounted: false
};
