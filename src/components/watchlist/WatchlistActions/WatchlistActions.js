import React, { useState } from 'react';
import { ListItem, List, ListItemText, Switch, Grid, Typography, Menu, MenuItem, Button } from '@material-ui/core';
import WatchlistService from '../WatchlistService';
import { useDispatch, useSelector } from 'react-redux';
import { setIsColorEnable, setIsActiveCompanies } from '../../../reducers/Watchlist';
import { updateWatchlistEmailAlertStatus } from './WatchlistActionApiCalls';
import { getUser, saveUser } from '../WatchlistHelpers';
import FileTypes from '../../../config/watchlistFileTyes';
import config from '../../../config/config';
import { setWatchlistFileTypesEmailAlertStatus } from './../../../reducers/Watchlist';
import { cloneDeep, get } from 'lodash';
import axios from 'axios';
export default function WatchListActions() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isColorEnable, isActiveCompanies, fileTypesEmailAlertStatus } = useSelector(state => state.Watchlist);
  const actions = [
    { key: 'autoSize', label: 'Auto Size Columns' },
    // { key: 'sizeToFit', label: 'Fit Column Size' },
    { key: 'csvExport', label: 'CSV Export' }
  ];

  const handleClick = event => {
    actionSelected(event);
  };

  const handleActive = event => {
    if (event.target.checked) {
      dispatch(setIsActiveCompanies(true));
    } else {
      dispatch(setIsActiveCompanies(false));
    }
  };

  const actionSelected = actionName => {
    if (actionName === 'autoSize') {
      WatchlistService.autoSizeColumns();
    } else if (actionName === 'sizeToFit') {
      WatchlistService.sizeColumnsToFit();
    } else if (actionName === 'csvExport') {
      WatchlistService.exportWatchlist('csv');
    }
  };

  const handleChange = event => {
    if (event.target.checked) {
      dispatch(setIsColorEnable(true));
      updateUserLocalStorage(true);
    } else {
      updateUserLocalStorage(false);
      dispatch(setIsColorEnable(false));
    }
    dispatch(updateWatchlistEmailAlertStatus());
  };

  const updateUserLocalStorage = status => {
    const user = getUser();
    user.enable_watchlist_color = status;
    saveUser(user);
  };

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
      <List component="nav">
        {actions.map((action, index) => {
          return (
            <ListItem
              key={index}
              button
              onClick={() => {
                handleClick(action.key);
              }}>
              <ListItemText primary={action.label} />
            </ListItem>
          );
        })}
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Switch
              checked={isColorEnable}
              onChange={handleChange}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item>
            <Typography>Enable Colors</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item>
            <Switch
              checked={isActiveCompanies}
              onChange={handleActive}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item>
            <Typography>Show Active Companies</Typography>
          </Grid>
        </Grid>
      </List>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={e => setAnchorEl(e.currentTarget)}
        variant={'outlined'}
        color={'primary'}
        style={{ margin: '5px 0 0 10px' }}
      >
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
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        {FileTypes.map((file, index) => {
          const isEnable = getEmailStatus(file.label);
          return (
            <MenuItem key={index}>
              <Grid
                style={{ width: '160px' }}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
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
}
