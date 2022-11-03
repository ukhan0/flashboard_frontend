import React, { useState } from "react"
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserSettingsStyles from "./UserSettingsStyles";
import UserSettingsGeneralTab from "./UserSettingsGeneralTab";
import UserSettingsChangePasswordTab from "./UserSettingsChangePasswordTab";

import UserSettingsTabpanel from "./UserSettingsTabpanel";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const UserSettings = () => {
  const [tab, setTab] = useState(0);
  const classes = UserSettingsStyles();

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
            <Tab label="Change Password" icon={<VpnKeyIcon />} className={classes.tab}/>
          </Tabs>

          <UserSettingsTabpanel value={tab} index={0}> <UserSettingsGeneralTab /></UserSettingsTabpanel>
          <UserSettingsTabpanel value={tab} index={1}> <UserSettingsChangePasswordTab/></UserSettingsTabpanel>
        </div>


      </div>
    </div>

  );

}

export default UserSettings;