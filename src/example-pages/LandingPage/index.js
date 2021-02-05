import React, { Fragment } from 'react';

import { Grid, Container, Button } from '@material-ui/core';
import clsx from 'clsx';
import { connect } from 'react-redux';
import projectLogo from '../../assets/images/logos/sma-logo-white.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'react-router-dom';

import desktopImage from '../../assets/images/composed-bg/sma_filing_desktop.png';
import mobileImage from '../../assets/images/composed-bg/SMA_Filings_mobile.png';
import Footer from '../../layout-components/Footer';
import hero6 from '../../assets/images/hero-bg/hero-6.jpg';

const LandingPage = props => {
  const { footerFixed } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Fragment>
      <div className="hero-wrapper bg-composed-wrapper bg-white">
        <div className="header-nav-wrapper header-nav-wrapper-lg w-100 navbar-dark">
          <Container className="d-flex" fixed>
            <div className="header-nav-logo align-items-center d-flex justify-content-start">
              <div className="nav-logo">
                <Link to="/" title="SMA">
                  <i className="bg-dark hero-logo">
                    <img alt="SMA" src={projectLogo} style={{ paddingTop: 3 }} />
                  </i>
                </Link>
              </div>
            </div>
            <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
              <span className="d-none d-lg-block">
                <Button component={Link} to="/watchlist" className="px-3" color="primary" variant="contained">
                  Dashboard
                </Button>
              </span>
            </div>
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
                <Grid item xs={12} lg={7} xl={6} className="d-flex align-items-center">
                  <div>
                    <div className="text-black mt-3">
                      <h1 className="display-2 mb-3 font-weight-bold">
                        FilingsFlash© using Machine Readable Filings (MRF)
                      </h1>
                      <p className="font-size-lg text-black-50">FilingsFlash by Social Market Analytics, Inc. (SMA)</p>
                      <p className="text-black">
                        SMA has partnered with S&P Global Market Intelligence on 'Machine Readable Filings' (MRF). MRF
                        has turned SEC Edgar Filings into Textual Data at the Item, Section, Sub-Section, and Note level
                        with Historical Baselines going back to 2006. FlilingsFlash is the first product using MRF to
                        allow for quick sorting by Sentiment, Change in Sentiment, and Change in Cord Count.
                        FilingsFlash also provides filtering by Tabs for Recent Filings over the Last Week or at the
                        Total Doc or the Item Level including MD&A, Risk, Notes, and FSS.
                      </p>
                      <div className="divider border-2 border-dark mt-4 mb-2 border-light opacity-2 rounded-circle w-25" />
                      <div>
                        {user != null ? (
                          <Button
                            to="/watchlist"
                            component={Link}
                            size="large"
                            className="py-3 px-5 mt-2"
                            color="primary"
                            variant="contained"
                            title="Dashboard">
                            <span className="btn-wrapper--label">Dashboard</span>
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                            </span>
                          </Button>
                        ) : (
                          <Button
                            to="/PagesRegister"
                            component={Link}
                            size="large"
                            variant="contained"
                            color="secondary"
                            className="py-3 px-5 ml-2 mt-2"
                            title="Dashboard">
                            <span className="btn-wrapper--icon">
                              <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
                            </span>
                            <span className="btn-wrapper--label">SignIn</span>
                          </Button>
                        )}
                      </div>
                      <small className="d-block pt-3">
                        Disclaimer: Social Market Analytics, Inc. is not an investment advisor, broker, or dealer, and
                        therefore does not provide any investment advice, nor does it participate in the offer, sale, or
                        distribution of securities. SMA does not provide trading or investment advice. SMA is not liable
                        for any loss or damage caused by any reliance on information obtained in this report , in our
                        website, or in our communications.
                      </small>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} lg={5} xl={6} className="px-0 d-none d-lg-flex align-items-center">
                  <div style={{ position: 'relative' }}>
                    <img alt="..." className="" style={{ width: 580 }} src={desktopImage} />

                    <div style={{ position: 'absolute', top: 88, right: -16 }}>
                      <img alt="..." className="" style={{ width: 160 }} src={mobileImage} />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </div>
      <div
        className={clsx('app-content', {
          'app-content-footer-fixed': footerFixed
        })}>
        <Footer />
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed
});

export default connect(mapStateToProps)(LandingPage);
