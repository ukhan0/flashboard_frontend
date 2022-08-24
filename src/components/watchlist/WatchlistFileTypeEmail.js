import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileTypes from '../../config/watchlistFileTyes';
import config from '../../config/config';
import { setWatchlistFileTypesEmailAlertStatus } from '../../reducers/Watchlist';
import { cloneDeep, get } from 'lodash';
import axios from 'axios';
import { Switch, Grid, Typography, Menu, MenuItem, Button } from '@material-ui/core';

const WatchlistFileTypeEmail = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { fileTypesEmailAlertStatus } = useSelector(state => state.Watchlist);

  const onEmailStatusChange = async (e, send_email, doc_type) => {
    try {
      e.stopPropagation();
      let fileTypesInfoObj = cloneDeep(fileTypesEmailAlertStatus);
      const fileIndex = fileTypesInfoObj.findIndex(fileTypeInfoObj => fileTypeInfoObj.filetype === doc_type);
      if (fileIndex !== -1) {
        fileTypesInfoObj[fileIndex].isEmailEnable = send_email;
      } else {
        fileTypesInfoObj.push({
          filetype: doc_type,
          isEmailEnable: send_email
        });
      }
      dispatch(setWatchlistFileTypesEmailAlertStatus(fileTypesInfoObj));

      const response = await axios.post(`${config.apiUrl}/api/update_doc_email_status`, {
        doc_type,
        send_email
      });
      const isError = get(response, 'data.error', true);
      if (isError) {
        let previousFileTypesInfoObj = cloneDeep(fileTypesEmailAlertStatus);
        const addedObjectIndex = previousFileTypesInfoObj.findIndex(
          fileTypeInfoObj => fileTypeInfoObj.filetype === doc_type
        );
        previousFileTypesInfoObj[addedObjectIndex].isEmailEnable = !send_email;
        dispatch(setWatchlistFileTypesEmailAlertStatus(previousFileTypesInfoObj));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEmailStatus = fileType => {
    const filteredFileType = fileTypesEmailAlertStatus.find(type => type.filetype === fileType);
    return filteredFileType?.isEmailEnable ? true : false;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={e => setAnchorEl(e.currentTarget)}
        variant={'outlined'}
        color={'primary'}
        style={{ margin: '5px 0 0 10px' }}>
        File Type Email Alerts
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        style={{ height: '80%' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}>
        {FileTypes.map((file, index) => {
          const isEnable = getEmailStatus(file.label);
          return (
            <MenuItem key={index}>
              <Grid style={{ width: '160px' }} container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                  <Typography>{file.label}</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={isEnable}
                    onClick={e => onEmailStatusChange(e, !isEnable, file.label)}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid>
              </Grid>
            </MenuItem>
          );
        })}
      </Menu>
      {/* <Grid item>
        <Typography style={{ marginTop: '15px', paddingLeft: '10px' }}>Email Alerts!</Typography>
      </Grid>
      {FileTypes.map((file, index) => {
        const isEnable = getEmailStatus(file.label);
        return (
          <Grid container direction="row" alignItems="center" key={index}>
            <Grid item>
              <Switch
                checked={isEnable}
                onClick={e => onEmailStatusChange(e, !isEnable, file.label)}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item>
              <Typography>{file.label}</Typography>
            </Grid>
          </Grid>
        );
      })} */}
    </>
  );
};

export default WatchlistFileTypeEmail;
