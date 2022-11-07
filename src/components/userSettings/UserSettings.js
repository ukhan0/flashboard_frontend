import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UserSettingsGeneralTab from './UserSettingsGeneralTab';
import UserSettingsChangePasswordTab from './UserSettingsChangePasswordTab';
import UserSettingsTabpanel from './UserSettingsTabpanel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  userSettingsContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
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

  const handleTab = (e, tab) => {
    setTab(tab);
  };

  return (
    <div className="user-settings-page bg-light">
      <Container className={classes.userSettingsContainer}>
        <div className={classes.mainContainer}>
          <Typography variant='h2' className={classes.settingsHeading}>Account Settings</Typography>

          <div className={classes.tabContainer}>
            <Tabs value={tab} onChange={handleTab} indicatorColor="primary" textColor="primary">
              <Tab label="General" icon={<AccountBoxIcon />} className={classes.tab} />
              <Tab label="Change Password" icon={<VpnKeyIcon />} className={classes.tab} />
            </Tabs>

            <UserSettingsTabpanel value={tab} index={0}>
              {' '}
              <UserSettingsGeneralTab />
            </UserSettingsTabpanel>
            <UserSettingsTabpanel value={tab} index={1}>
              {' '}
              <UserSettingsChangePasswordTab />
            </UserSettingsTabpanel>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserSettings;
