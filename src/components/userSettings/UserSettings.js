import React, { useState } from "react"
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserSettingsGeneralTab from "./UserSettingsGeneralTab";
import UserSettingsChangePasswordTab from "./UserSettingsChangePasswordTab";
import UserSettingsTabpanel from "./UserSettingsTabpanel";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    // backgroundColor: 'white',
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
      flexDirection: 'row',
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px'
    }
  },
  generalTabMainContainer: {
    marginTop: '20px'
  },
}));

const UserSettings = () => {
  const [tab, setTab] = useState(0);
  const classes = useStyles();

  const handleTab = (e, tab) => {
    setTab(tab)
  }

  return (

    <div className="user-settings-page bg-light">
      <div className={classes.mainContainer}>
        <h2 className={classes.settingsHeading}>Account Settings</h2>



        <div className={classes.tabContainer}>
          <Tabs
            value={tab}
            onChange={handleTab}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="General" icon={<AccountBoxIcon />} className={classes.tab} />
            <Tab label="Change Password" icon={<VpnKeyIcon />} className={classes.tab} />
          </Tabs>

          <UserSettingsTabpanel value={tab} index={0}> <UserSettingsGeneralTab /></UserSettingsTabpanel>
          <UserSettingsTabpanel value={tab} index={1}> <UserSettingsChangePasswordTab /></UserSettingsTabpanel>
        </div>


      </div>
    </div>

  );

}

export default UserSettings;