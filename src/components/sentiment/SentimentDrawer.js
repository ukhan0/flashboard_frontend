import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => {
  return {
    list: {
      width: '40vw',
    },
    listItem: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: 20,
      cursor: 'pointer',
      color: '#0a30f3',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    drawerBtn: {
      textAlign: 'center',
      marginTop: '5px'
    }
  }
});

const SentimentDrawer = props => {
  const classes = useStyles();

  const { data } = useSelector(state => state.Sentiment);

  const displayData = []
  function visitOutlineObj (acc, obj, lvl, path) {
    if (lvl > 4) return;
    lvl += 1;
    for (var prop in obj) {
      var li = {};
      path += `.${prop}`
      if (prop != 'Headingtag' && prop != 'Sectiontext' && prop != 'data') {
        li = {path, lvl, prop};
        acc.push(li);
      }
      if (typeof obj[prop] === 'object') {
        visitOutlineObj(acc, obj[prop], lvl, path);
      }
    }
  }
  visitOutlineObj(displayData, data, 0, '')
  return (
    <React.Fragment>
      <Drawer anchor={'right'} open={props.isOpen} onClose={props.onClose}>
        <div className={classes.list}>
          {/* <Button className={classes.drawerBtn} variant="contained" color="primary" onClick={props.onClose}>
            close
          </Button> */}
          <IconButton onClick={props.onClose}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          {
            displayData.map((d, index) =>
              <div key={index} style={{paddingLeft: (d.lvl * 4) +4}} className={classes.listItem} onClick={() => props.onSelection(d.path)}>
                {d.prop}
              </div>
            )
          }
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default SentimentDrawer;
