import React, { Fragment } from 'react';

import {
  Grid,
  Fab,
  Container,
  Drawer,
  IconButton,
  Button,
  List,
  ListItem,
  Divider
} from '@material-ui/core';

import projectLogo from '../../assets/images/logos/sma-logo-white.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import svgImage11 from '../../assets/images/illustrations/businesswoman.svg';

import hero6 from '../../assets/images/hero-bg/hero-6.jpg';

const LandingPage = () => {
  const [state, setState] = React.useState({
    right: false
  });
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  return (
    <Fragment>
      <div className="hero-wrapper bg-composed-wrapper bg-white">
        <div className="header-nav-wrapper header-nav-wrapper-lg w-100 navbar-dark">
          <Container className="d-flex" fixed>
            <div className="header-nav-logo align-items-center d-flex justify-content-start">
              <div className="nav-logo">
                <Link
                  to="/"
                  title="Carolina React Admin Dashboard with Material-UI PRO">
                  <i className="bg-dark hero-logo">
                    <img alt="SMA" src={projectLogo} />
                  </i>
                </Link>
              </div>
            </div>
            <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
              <span className="d-none d-lg-block">
                <Button
                  component={Link}
                  to="/watchlist"
                  className="px-3"
                  color="primary"
                  variant="contained">
                  Dashboard
                </Button>
              </span>
              <span className="d-block d-lg-none">
                <Fab
                  onClick={toggleDrawer('right', true)}
                  color="secondary"
                  size="medium">
                  <MenuRoundedIcon />
                </Fab>
              </span>
            </div>
            <Drawer
              variant="temporary"
              anchor="right"
              open={state.right}
              onClose={toggleDrawer('right', false)}
              elevation={11}>
              <List className="py-0">
                <ListItem className="d-block bg-secondary py-2 px-3">
                  <div className="d-flex w-100 justify-content-between navbar-light align-content-center">
                    <div className="header-nav-logo justify-content-start">
                      <a
                        href="#/"
                        onClick={e => e.preventDefault()}
                        className="navbar-brand d-flex align-items-center d-40"
                        title="Carolina React Admin Dashboard with Material-UI PRO">
                        <img
                          alt="Carolina React Admin Dashboard with Material-UI PRO"
                          className="d-block img-fluid"
                          src={projectLogo}
                        />
                      </a>
                    </div>
                    <IconButton
                      onClick={toggleDrawer('right', false)}
                      color="primary">
                      <MenuRoundedIcon />
                    </IconButton>
                  </div>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-deep-blue text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'object-group']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Dashboards
                        </div>
                        <span className="text-black-50">
                          12 different dashboards to choose from
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/ApplicationsChat"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-strong-bliss text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'sitemap']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Apps
                        </div>
                        <span className="text-black-50">
                          Multiple application designs included
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/Cards3"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-arielle-smile text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'shapes']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Cards
                        </div>
                        <span className="text-black-50">
                          Over 300 different cards available
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/RegularTables"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-happy-green text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'table']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Tables
                        </div>
                        <span className="text-black-50">
                          Multiple, easy to customise tables
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Link
                    to="/FormsWizard"
                    className="d-flex px-2 align-items-center dropdown-item rounded">
                    <div className="align-box-row w-100">
                      <div className="mr-3">
                        <div className="bg-skim-blue text-center text-white d-40 rounded-circle">
                          <FontAwesomeIcon icon={['fas', 'align-center']} />
                        </div>
                      </div>
                      <div className="text-truncate max-w-70 overflow-hidden">
                        <div className="font-weight-bold text-primary d-block">
                          Forms
                        </div>
                        <span className="text-black-50">
                          Over 50 forms elements included
                        </span>
                      </div>
                      <div className="ml-auto card-hover-indicator align-self-center">
                        <FontAwesomeIcon
                          icon={['fas', 'chevron-right']}
                          className="font-size-lg"
                        />
                      </div>
                    </div>
                  </Link>
                </ListItem>
                <Divider />
                <ListItem className="d-block py-3 px-2">
                  <Button
                    href="/watchlist"
                    className="text-white w-100"
                    variant="contained"
                    color="secondary">
                    Dashboard
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </Container>
        </div>

        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image bg-composed-filter-rm opacity-9"
            style={{ backgroundImage: 'url(' + hero6 + ')' }}
          />
          <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
            <Container fixed className="pb-5">
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  lg={7}
                  xl={6}
                  className="d-flex align-items-center">
                  <div>
                    <div className="text-black mt-3">
                      <h1 className="display-2 mb-3 font-weight-bold">
                        FilingsFlash© using Machine Readable Filings (MRF)
                      </h1>
                      <p className="font-size-lg text-black-50">
                        FilingsFlash by Social Market Analytics, Inc. (SMA)
                      </p>
                      <p className="text-black">
                        SMA has partnered with S&P Global Market Intelligence on 'Machine Readable Filings' (MRF). MRF has turned SEC Edgar Filings into Textual Data at the Item, Section, Sub-Section, and Note level with Historical Baselines going back to 2006. FlilingsFlash is the first product using MRF to allow for quick sorting by Sentiment, Change in Sentiment, and Change in Cord Count. FilingsFlash also provides filtering by Tabs for Recent Filings over the Last Week or at the Total Doc or the Item Level including MD&A, Risk, Notes, and FSS.
                      </p>
                      <div className="divider border-2 border-dark mt-4 mb-2 border-light opacity-2 rounded-circle w-25" />
                      <div>
                        <Button
                          to="/watchlist"
                          component={Link}
                          size="large"
                          className="py-3 px-5 mt-2"
                          color="primary"
                          variant="contained"
                          title="View Carolina React Admin Dashboard with Material-UI PRO Live Preview">
                          <span className="btn-wrapper--label">Dashboard</span>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                          </span>
                        </Button>
                        <Button
                          to="/PagesRegister"
                          component={Link}
                          size="large"
                          variant="contained"
                          color="secondary"
                          className="py-3 px-5 ml-2 mt-2"
                          title="Read about what Carolina React Admin Dashboard with Material-UI PRO has to offer!">
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon
                              icon={['fas', 'external-link-alt']}
                            />
                          </span>
                          <span className="btn-wrapper--label">Register</span>
                        </Button>
                      </div>
                      <small className="d-block pt-3">
                        Disclaimer: Social Market Analytics, Inc. is not an investment advisor, broker, or dealer, and therefore does not provide any investment advice, nor does it participate in the offer, sale, or distribution of securities. SMA does not provide trading or investment advice. SMA is not liable for any loss or damage caused by any reliance on information obtained in this report , in our website, or in our communications.
                      </small>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={5}
                  xl={6}
                  className="px-0 d-none d-lg-flex align-items-center">
                  <img
                    alt="..."
                    className="w-100 mx-auto d-block img-fluid"
                    src={svgImage11}
                  />
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
