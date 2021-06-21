import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BeatLoader } from 'react-spinners';
import { createHash } from '../../utils/helpers';
import { setSelectedHeadingId } from '../../reducers/Sentiment';
import { startCase } from 'lodash';

const useStyles = makeStyles(theme => {
  return {
    list: {
      width: '40vw'
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
    }
  };
});

const SentimentDrawer = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.Sentiment);
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
    visitOutlineObj(displayData, data, 0, '');
  }

  const clickHandle = path => {
    props.onSelection(createHash(path));
    dispatch(setSelectedHeadingId(createHash(path)));
  };

  return (
    <React.Fragment>
      <Drawer anchor={'right'} open={props.isOpen} onClose={props.onClose}>
        <div className={classes.list}>
          <div className={classes.header}>
            <IconButton onClick={props.onClose}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <div>
              <Typography variant={'h4'}>Table of contents</Typography>
            </div>
            <div></div>
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
                  style={{ paddingLeft: d.lvl * 4 + 4 }}
                  className={classes.listItem}
                  onClick={() => {
                    clickHandle(d.path);
                  }}>
                  {startCase(d.prop)}
                </div>
              ) : null
            )
          )}
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default SentimentDrawer;
