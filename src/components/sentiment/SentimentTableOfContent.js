import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { BeatLoader } from 'react-spinners';
import { lowerCase } from 'lodash';
import { setIsPin, setSentimentDrawerOpen, setCurrentToc } from '../../reducers/Sentiment';
import { upperCase } from 'lodash';
import clsx from 'clsx';
import pinOpen from '../../assets/images/illustrations/minimize.svg';
import pinClose from '../../assets/images/illustrations/maximize-size-option.svg';

const useStyles = makeStyles(theme => {
  return {
    list: {
      width: '40vw'
    },
    list2: {
      whiteSpace: 'initial'
    },
    listItem: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: 20,
      cursor: 'pointer',
      color: '#0a30f3',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    drawerBtn: {
      textAlign: 'center',
      marginTop: '5px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    loaderSection: {
      textAlign: 'center'
    },
    upper: {
      textTransform: 'capitalize'
    },
    pin: {
      overflowY: 'auto',
      height: `${window.innerHeight - 100}px`
    },
    crossIcon: {
      color: 'black'
    },
    link: {
      color: 'white',
      marginRight: '20px',
      '&:hover': {
        color: 'blue'
      }
    }
  };
});

const SentimentTableOfContent = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, isPin } = useSelector(state => state.Sentiment);
  const { selectedItem } = useSelector(state => state.Watchlist);

  const handlePin = () => {
    if (isPin) {
      dispatch(setIsPin(false));
      dispatch(setSentimentDrawerOpen(true));
    } else {
      dispatch(setIsPin(true));
      dispatch(setSentimentDrawerOpen(false));
    }
  };
  const handleClose = () => {
    dispatch(setIsPin(false));
    dispatch(setCurrentToc(true));
  };

  const handleCloseDrawer = () => {
    dispatch(setSentimentDrawerOpen(false));
    dispatch(setCurrentToc(false));
  };

  let signatureIterator = 1;
  return (
    <React.Fragment>
      <div className={isPin ? classes.pin : classes.list}>
        <div className={classes.header}>
          <div></div>
          <div>
            <Typography variant={'h4'}>Table of contents</Typography>
          </div>
          <div>
            <Button onClick={handlePin}>
              {isPin ? (
                <img alt={'UnPin'} style={{ height: '20px', width: '20px' }} src={pinClose} />
              ) : (
                <img alt={'Pin'} style={{ height: '20px', width: '20px' }} src={pinOpen} />
              )}
            </Button>
            {isPin ? (
              <IconButton className={classes.crossIcon} onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                className={classes.crossIcon}
                onClick={() => {
                  handleCloseDrawer();
                }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className={classes.loaderSection}>
            <BeatLoader color={'var(--primary)'} size={15} />
          </div>
        ) : (
          props.tableData.map((d, index) => {
            let idVal =
              index !== 0
                ? d.lvl === 4
                  ? lowerCase(d.prop)
                  : lowerCase(
                    d.prop
                      .toLowerCase()
                      .replace('data', '')
                      .replace('ex.data', '')
                      .replace('*.data', '')
                  )
                : '';
            if (idVal === 'signatures') {
              idVal = idVal + signatureIterator;
              signatureIterator++;
            }
            return index !== 0 ? (
              <div
                key={index}
                style={{ paddingLeft: d.lvl * 4 + 4, whiteSpace: 'initial' }}
                className={clsx(classes.listItem, classes.upper)}
                onClick={() => {
                  props.clickHandle(idVal);
                }}>
                {d.lvl === 4
                  ? upperCase(d.prop)
                  : d.prop
                    .toLowerCase()
                    .replace('data', '')
                    .replace('ex.data', '')
                    .replace('*.data', '')}
              </div>
            ) : null;
          })
        )}
        {selectedItem ? (
          <Grid container direction="row" justify="flex-end" alignItems="flex-end">
            <Grid item>
              <a
                href={`https://engine-spirit.s-factors.com/dictionary/historysummary?id=${selectedItem.recentId}`}
                target="_blank"
                rel="noopener noreferrer">
                <p className={clsx(classes.link)}>View</p>
              </a>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default SentimentTableOfContent;
