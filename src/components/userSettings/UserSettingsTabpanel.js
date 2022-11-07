import React from "react"

const UserSettingsTabpanel = ({ children, value, index, ...rest }) =>  {
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...rest}
      >
        {value === index && (
          <div>
            {children}
          </div>
        )}
      </div>
    );
  }


  export default UserSettingsTabpanel;