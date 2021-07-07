import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { BeatLoader } from 'react-spinners';
import { createHash } from '../../utils/helpers';
import {
  setSelectedHeadingId,
  setIsPin,
  setSentimentDrawerOpen,
  setShowTocButton,
  setCurrentToc
} from '../../reducers/Sentiment';
import { upperCase, get } from 'lodash';
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
    crossIcon: {
      color: 'black'
    }
  };
});

const SentimentTableOfContent = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, isLoading, isPin } = useSelector(state => state.Sentiment);
  const displayData = [];
  function visitOutlineObj(acc, obj, lvl, path) {
    if (lvl > 4) return;
    lvl += 1;
    for (var prop in obj) {
      var li = {};
      path += `.${prop}`;
      if (prop !== 'Headingtag' && prop !== 'Sectiontext' && prop !== 'data') {
        li = { path, lvl, prop };
        acc.push(li);
      }
      if (typeof obj[prop] === 'object') {
        visitOutlineObj(acc, obj[prop], lvl, path);
      }
    }
  }
  if (data) {
    const headings = get(data, 'data_json', []);
    visitOutlineObj(displayData, headings, 0, '');
  }

  const clickHandle = path => {
    props.onSelection(createHash(path));
    dispatch(setSelectedHeadingId(createHash(path)));
  };

  const handlePin = () => {
    if (isPin) {
      dispatch(setIsPin(false));
      dispatch(setSentimentDrawerOpen(true));
    } else {
      dispatch(setIsPin(true));
      dispatch(setSentimentDrawerOpen(false));
      dispatch(setShowTocButton(false));
    }
  };
  const handleClose = () => {
    dispatch(setShowTocButton(true));
    dispatch(setIsPin(false));
    dispatch(setCurrentToc(true));
  };

  const handleCloseDrawer = () => {
    dispatch(setSentimentDrawerOpen(false));
    dispatch(setCurrentToc(false));
    dispatch(setShowTocButton(true));
  };
  return (
    <React.Fragment>
      <div className={isPin ? null : classes.list}>
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
          displayData.map((d, index) =>
            index !== 0 ? (
              <div
                key={index}
                style={{ paddingLeft: d.lvl * 4 + 4, whiteSpace: 'initial' }}
                className={clsx(classes.listItem, classes.upper)}
                onClick={() => {
                  clickHandle(d.path);
                }}>
                {d.lvl === 3 ? upperCase(d.prop) : d.prop}
              </div>
            ) : null
          )
        )}
      </div>
    </React.Fragment>
  );
};

export default SentimentTableOfContent;
