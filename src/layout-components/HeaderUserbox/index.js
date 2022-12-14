import React, { Fragment, useState } from 'react';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import avatar4 from '../../assets/images/avatars/avatar8.png';
import withStyles from '@material-ui/core/styles/withStyles';
import { deleteToken } from '../../utils/helpers';
import SocketService from '../../socketService';
import { useSelector } from 'react-redux';
const StyledBadge = withStyles({
  badge: {
    backgroundColor: 'var(--success)',
    color: 'var(--success)',
    boxShadow: '0 0 0 2px #fff',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
})(Badge);
export default function HeaderUserbox() {
  const { user } = useSelector(state => state.User);
  const profilePic = get(user, 'profile_pic', null);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    SocketService.socket.close();
    deleteToken();
    setTimeout(() => {
      localStorage.clear();
    }, 100);
    history.push('/PagesRegister');
  };

  const gotoSettings = () => {
    setAnchorEl(null);
    history.push('/settings');
  };

  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        <Box>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            variant="dot">
            <Avatar sizes="44" alt="Dustin Watson" src={profilePic ? profilePic : avatar4} />
          </StyledBadge>
        </Box>
        <div className="d-xl-block pl-3">
          <div className="font-weight-bold pt-2 line-height-1">{get(user, 'name', '')}</div>
          <span className="text-white-50">{get(user, 'email', '')}</span>
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>

      {Boolean(anchorEl) ? (
        <Menu
          anchorEl={anchorEl}
          keepMounted
          getContentAnchorEl={null}
          open={true}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          onClose={handleClose}
          className="ml-2">
          <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
            <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
              <Box>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  variant="dot">
                  <Avatar sizes="44" alt="Dustin Watson" src={profilePic ? profilePic : avatar4} />
                </StyledBadge>
              </Box>
              <div className="pl-3 ">
                <div className="font-weight-bold text-center pt-2 line-height-1">{get(user, 'name', '')}</div>
                <span className="text-black-50 text-center">{get(user, 'email', '')}</span>
              </div>
              <Divider className="w-100 mt-2" />
              <ListItem button color="secondary" onClick={gotoSettings}>
                Settings
              </ListItem>
              <ListItem button color="secondary" onClick={signout}>
                Sign Out
              </ListItem>
            </List>
          </div>
        </Menu>
      ) : null}
    </Fragment>
  );
}
