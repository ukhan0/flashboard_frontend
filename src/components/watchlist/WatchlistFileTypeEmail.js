import React, { useEffect, useState } from 'react';
import config from '../../config/config';
import { cloneDeep, get } from 'lodash';
import axios from 'axios';
import { Switch, Grid, Typography, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setDocTypeSendEmail } from '../../reducers/Watchlist';
import { FileTypes } from '../../config/watchlistFileTyes';
import { renameDocumentTypesLabel } from '../topic/topicHelpers';

const emailFileTypes = FileTypes.fileTypes.map(fileObj => {
  return {
    doc_type: fileObj.label,
    send_email: false
  };
});

const useStyles = makeStyles(theme => ({
  fileType: {
    '&:hover': {
      transform: 'scale(1.02)'
    },
    padding: '0 20px',
    width: '90%'
  },
  fileTypesMain: {
    marginTop: '20px'
  },
  listItem: {
    padding: '0 5px 0 10px',
    cursor: 'pointer',
    backgroundColor: '#c9c9c9',
    borderRadius: '3px'
  },
  bgColor1: {
    backgroundColor: '#f2f2f2'
  },
  bgColor2: {
    backgroundColor: '#fffafa'
  }
}));

const WatchlistFileTypeEmail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { docTypeSendEmail } = useSelector(state => state.Watchlist);
  const [fileTypesEmailAlertStatus, setFileTypesEmailAlertStatus] = useState([]);

  const onSelectAllSwitchStatusClick = async () => {
    const currentSelectAllSwitchStatus = getSelectAllSwitchStatus();
    let fileTypesInfoObj = cloneDeep(fileTypesEmailAlertStatus);
    const requestArr = fileTypesInfoObj.map(file => {
      return {
        doc_type: file.doc_type
      };
    });
    setFileTypesEmailAlertStatus(prevState => {
      return prevState.map(obj => {
        obj.send_email = !currentSelectAllSwitchStatus;
        return obj;
      });
    });

    const response = await axios.post(
      `${config.apiUrl}/api/update_doc_email_status?select_doc=all&status=${!currentSelectAllSwitchStatus}`,
      { doc_arr: requestArr }
    );
    const isError = get(response, 'data.error', true);
    if (isError) {
      setFileTypesEmailAlertStatus(fileTypesInfoObj);
    }
  };

  const onEmailStatusChange = async (e, send_email, doc_type, index) => {
    try {
      e.stopPropagation();
      let fileTypesInfoObj = cloneDeep(fileTypesEmailAlertStatus);
      fileTypesInfoObj[index].send_email = send_email;
      setFileTypesEmailAlertStatus(fileTypesInfoObj);

      const response = await axios.post(`${config.apiUrl}/api/update_doc_email_status`, { doc_type, send_email });
      const isError = get(response, 'data.error', true);
      if (isError) {
        setFileTypesEmailAlertStatus(prevState => {
          let clonedPrevState = cloneDeep(prevState);
          clonedPrevState[index].send_email = !clonedPrevState[index].send_email;
          return clonedPrevState;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectAllSwitchStatus = () => {
    const enabledEmailStatus = fileTypesEmailAlertStatus.filter(file => file.send_email);
    return enabledEmailStatus.length === fileTypesEmailAlertStatus.length;
  };

  useEffect(() => {
    let dataArray = [];
    if (docTypeSendEmail.length > 0) {
      emailFileTypes.forEach(file => {
        const filtereddata = docTypeSendEmail.find(obj => obj.doc_type === file.doc_type);
        if (filtereddata) {
          dataArray.push(filtereddata);
        } else {
          dataArray.push(file);
        }
      });
      setFileTypesEmailAlertStatus(dataArray);
    } else {
      setFileTypesEmailAlertStatus(emailFileTypes);
    }
  }, [docTypeSendEmail]);

  useEffect(() => {
    return () => {
      setFileTypesEmailAlertStatus(prevState => {
        dispatch(setDocTypeSendEmail(prevState));
        return prevState;
      });
    };
  }, [dispatch]);

  return (
    <>
      <div className={classes.fileTypesMain}>
        <div className={classes.fileType}>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.listItem}
            onClick={onSelectAllSwitchStatusClick}>
            <Grid item xs={6}>
              <Typography variant="h5">{'Select all'}</Typography>
            </Grid>
            <Grid item container justify="flex-end" xs={6}>
              <Switch
                checked={getSelectAllSwitchStatus()}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Grid>
        </div>
        {fileTypesEmailAlertStatus.map((file, index) => {
          return (
            <div className={classes.fileType} key={index}>
              <Grid
                container
                direction="row"
                alignItems="center"
                className={`${classes.listItem} ${index % 2 === 0 ? classes.bgColor1 : classes.bgColor2}`}
                onClick={e => onEmailStatusChange(e, !file.send_email, file.doc_type, index)}>
                <Grid item xs={6}>
                  <Typography>{renameDocumentTypesLabel(file.doc_type)}</Typography>
                </Grid>
                <Grid item container xs={6} justify="flex-end">
                  <Switch
                    checked={file.send_email}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WatchlistFileTypeEmail;
