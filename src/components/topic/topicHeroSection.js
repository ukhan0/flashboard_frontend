import React, { useRef } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { InputAdornment, IconButton,List, ListItem, Tooltip, TextField, Divider } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../assets/images/avatars/avatar4.jpg';

const LivePreviewExample = () => {
  const isSidebarMenuOpen2 = useRef(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div  style={{ width:"100%" }}>
      <div
        className={clsx(
          'app-inner-content-layout--sidebar bg-white app-inner-content-layout--sidebar__xl pos-r border-right',
          { 'layout-sidebar-open': isSidebarMenuOpen2.current }
        )}>
        <div className="p-3">
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <Divider />
        <PerfectScrollbar>
          <List className="pt-0" style={{ height: 600 }}>
            <ListItem button className="bg-secondary text-uppercase px-4 py-2 font-weight-bold font-size-xs">
              Today
            </ListItem>
            <Divider />
            <ListItem button>
              <div className="rounded-0 p-2">
                <div>
                  <div className="avatar-icon-wrapper avatar-icon-sm mb-2">
                    <span className="badge-circle badge badge-success">Online</span>
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between text-black-50">
                      <div>Adella Galen</div>
                      <span className="opacity-5">12:54 PM</span>
                    </div>
                    <div className="font-weight-bold my-2">Beguiled and demoralized by the charms</div>
                    <p className="font-size-xs mb-0">
                      But I must explain to you how all this mistaken idea of denouncing pleasure and praising ...
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
            <Divider />
            <ListItem button>
              <div className="rounded-0 p-2">
                <div>
                  <div className="avatar-icon-wrapper avatar-icon-sm mb-2">
                    <span className="badge-circle badge badge-success">Online</span>
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar2} />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between text-black-50">
                      <div>Kate Jones</div>
                      <span className="opacity-5">5:22 PM</span>
                    </div>
                    <div className="font-weight-bold my-2">Take a trivial example</div>
                    <p className="font-size-xs mb-0">Because occasionally circumstances occur in which ...</p>
                  </div>
                </div>
              </div>
            </ListItem>
            <Divider />
            <ListItem button className="bg-secondary text-uppercase px-4 py-2 font-weight-bold font-size-xs">
              Yesterday
            </ListItem>
            <Divider />
            <ListItem button>
              <div className="rounded-0 p-2">
                <div>
                  <div className="avatar-icon-wrapper avatar-icon-sm mb-2">
                    <span className="badge-circle badge badge-success">Online</span>
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar3} />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between text-black-50">
                      <div>Napoleon Stacey</div>
                      <span className="opacity-5">2:16 AM</span>
                    </div>
                    <div className="font-weight-bold my-2">Belongs to those</div>
                    <p className="font-size-xs mb-0">
                      Because occasionally circumstances occur in which toil and pain can great pleasure ...
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
            <Divider />
            <ListItem button>
              <div className="rounded-0 p-2">
                <div>
                  <div className="avatar-icon-wrapper avatar-icon-sm mb-2">
                    <span className="badge-circle badge badge-success">Online</span>
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar4} />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between text-black-50">
                      <div>Mandy Erle</div>
                      <span className="opacity-5">1:42 AM</span>
                    </div>
                    <div className="font-weight-bold my-2">Duty through weakness</div>
                    <p className="font-size-xs mb-0">
                      Other greater pleasures, or else he endures pains to avoid worse pains ...
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
            <Divider />
            <ListItem button className="bg-secondary text-uppercase px-4 py-2 font-weight-bold font-size-xs">
              17<sup>th</sup> July
            </ListItem>
            <Divider />
            <ListItem button>
              <div className="rounded-0 p-2">
                <div>
                  <div className="avatar-icon-wrapper avatar-icon-sm mb-2">
                    <span className="badge-circle badge badge-success">Online</span>
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar1} />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between text-black-50">
                      <div>Adella Galen</div>
                      <span className="opacity-5">12:54 PM</span>
                    </div>
                    <div className="font-weight-bold my-2">Beguiled and demoralized by the charms</div>
                    <p className="font-size-xs mb-0">
                      But I must explain to you how all this mistaken idea of denouncing pleasure and praising ...
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
            <Divider />
            <ListItem button>
              <div className="rounded-0 p-2">
                <div>
                  <div className="avatar-icon-wrapper avatar-icon-sm mb-2">
                    <span className="badge-circle badge badge-success">Online</span>
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar2} />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between text-black-50">
                      <div>Kate Jones</div>
                      <span className="opacity-5">5:22 PM</span>
                    </div>
                    <div className="font-weight-bold my-2">Take a trivial example</div>
                    <p className="font-size-xs mb-0">Because occasionally circumstances occur in which ...</p>
                  </div>
                </div>
              </div>
            </ListItem>
            <Divider />
            <ListItem button>
              <div className="rounded-0 p-2">
                <div>
                  <div className="avatar-icon-wrapper avatar-icon-sm mb-2">
                    <span className="badge-circle badge badge-success">Online</span>
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar3} />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between text-black-50">
                      <div>Napoleon Stacey</div>
                      <span className="opacity-5">2:16 AM</span>
                    </div>
                    <div className="font-weight-bold my-2">Belongs to those</div>
                    <p className="font-size-xs mb-0">
                      Because occasionally circumstances occur in which toil and pain can great pleasure ...
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
            <Divider />
            <ListItem button>
              <div className="rounded-0 p-2">
                <div>
                  <div className="avatar-icon-wrapper avatar-icon-sm mb-2">
                    <span className="badge-circle badge badge-success">Online</span>
                    <div className="avatar-icon rounded-circle">
                      <img alt="..." src={avatar4} />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between text-black-50">
                      <div>Mandy Erle</div>
                      <span className="opacity-5">1:42 AM</span>
                    </div>
                    <div className="font-weight-bold my-2">Duty through weakness</div>
                    <p className="font-size-xs mb-0">
                      Other greater pleasures, or else he endures pains to avoid worse pains ...
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
          </List>
        </PerfectScrollbar>
      </div>
      </div>
      <div>
        <div className="app-inner-content-layout--main bg-white p-0">
          <div className="app-content--inner__header m-4 p-2 rounded d-flex justify-content-center justify-content-xl-between bg-secondary border-bottom">
            <div>
              <Tooltip arrow title="Previous">
                <IconButton variant="contained" color="primary" className="mr-2">
                  <FontAwesomeIcon icon={['fas', 'arrow-left']} className="font-size-sm" />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Next">
                <IconButton variant="contained" color="primary">
                  <FontAwesomeIcon icon={['fas', 'arrow-right']} className="font-size-sm" />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Tooltip arrow title="Reply">
                <IconButton variant="contained" color="primary" className="mx-2">
                  <FontAwesomeIcon icon={['fas', 'reply']} className="font-size-sm" />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Move to trash">
                <IconButton variant="contained" color="primary" className="text-danger">
                  <FontAwesomeIcon icon={['far', 'trash-alt']} className="font-size-sm" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <PerfectScrollbar className="mb-4 p-4">
            <h3 className="font-size-lg mb-3 font-weight-bold">Beguiled and demoralized by the charms</h3>
            <p className="font-size-lg mb-4 text-black-50">
              But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
              I will give you a complete account of the system.
            </p>

            <p>
              Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,
              but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
            </p>

            <p>
              To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some
              advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has
              no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
            </p>

            <p>
              On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and
              demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the
              pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through
              weakness of will, which is the same as saying through shrinking from toil and pain.
            </p>

            <p>
              These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is
              untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be
              welcomed and every pain avoided.
            </p>

            <p>
              But in certain circumstances and owing to the claims of duty or the obligations of business it will
              frequently occur that pleasures have to be repudiated and annoyances accepted.
            </p>

            <p>
              The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures
              to secure other greater pleasures, or else he endures pains to avoid worse pains.
            </p>

            <p>
              But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
              I will give you a complete account of the system, and expound the actual teachings of the great explorer
              of the truth, the master-builder of human happiness.
            </p>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default LivePreviewExample;
