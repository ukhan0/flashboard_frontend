import React, { Fragment } from 'react';
import SidebarMenu from '../../layout-components/SidebarMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Fab,
  InputAdornment,
  IconButton,
  Button,
  List,
  ListItem,
  Tooltip,
  TextField,
  Divider
} from '@material-ui/core';
const TopicFooterSidebar = () => {
  return (
    <Fragment>
      <List>
        <ListItem>
          <span className="text-uppercase font-size-sm text-black-50">Space available</span>
        </ListItem>
        <ListItem>
          <div className="display-3">
            <FontAwesomeIcon icon={['far', 'object-group']} />
          </div>
          <div className="pl-3">
            <small className="d-block mb-2">
              <b>21GB</b> used out of <b>25GB</b>
            </small>
            <div className="progress">
              <div
                aria-valuemax="100"
                aria-valuemin="0"
                aria-valuenow="77"
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: '77%' }}
              />
            </div>
          </div>
        </ListItem>
      </List>
    </Fragment>
  );
};

export default TopicFooterSidebar;
