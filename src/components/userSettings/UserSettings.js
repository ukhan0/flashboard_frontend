import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UserSettingsGeneralTab from './UserSettingsGeneralTab';
// import UserSettingsChangePasswordTab from './UserSettingsChangePasswordTab';
import UserSettingsTabpanel from './UserSettingsTabpanel';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { setSnackBarObj } from '../../reducers/Alerts';
import axios from 'axios';
import config from '../../config/config';
import { get } from 'lodash';
import { setUser } from '../../reducers/User';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  userSettingsContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  mainContainer: {
    padding: '4px 0 20px 0'
  },
  settingsHeading: {
    padding: '8px 16px'
  },
  tabContainer: {
    padding: '8px 16px'
  },
  tab: {
    '& .MuiTab-wrapper': {
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      },
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row'
      },

      '& .MuiSvgIcon-root': {
        marginRight: '8px'
      }
    }
  }
}));

const UserSettings = () => {
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleTab = (e, tab) => {
    setTab(tab);
  };

  const fetchUser = () => {
    return async (dispatch, getState) => {
      const { user } = getState().User;
      try {
        const response = await axios.get(`${config.apiUrl}/api/users/get_user/${user.id}`);

        const responsePayload = get(response, 'data', null);
        if (responsePayload && !responsePayload.error) {
          const userData = { ...user, themex_search_counter: responsePayload.data.themex_search_counter };
          localStorage.setItem('user', JSON.stringify(userData));
          dispatch(setUser(userData));
        } else {
          dispatch(setSnackBarObj({ message: responsePayload.message, severity: 'error' }));
        }
      } catch (error) {
        console.log(error);
        dispatch(setSnackBarObj({ message: 'An error has occurred. Please try again.', severity: 'error' }));
      }
    };
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="user-settings-page bg-light">
      <Container className={classes.userSettingsContainer}>
        <div className={classes.mainContainer}>
          <Typography variant="h2" className={classes.settingsHeading}>
            Account Settings
          </Typography>

          <div className={classes.tabContainer}>
            <Tabs value={tab} onChange={handleTab} indicatorColor="primary" textColor="primary">
              <Tab label="General" icon={<AccountBoxIcon />} className={classes.tab} />
              {/* <Tab label="Change Password" icon={<VpnKeyIcon />} className={classes.tab} /> */}
            </Tabs>

            <UserSettingsTabpanel value={tab} index={0}>
              {' '}
              <UserSettingsGeneralTab />
            </UserSettingsTabpanel>
            {/* <UserSettingsTabpanel value={tab} index={1}>
              {' '}
              <UserSettingsChangePasswordTab />
            </UserSettingsTabpanel> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserSettings;
