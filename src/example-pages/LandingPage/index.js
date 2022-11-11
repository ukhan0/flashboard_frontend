import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import projectLogo from '../../assets/images/logos/ca-logo-white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import desktopImage from '../../assets/images/composed-bg/sma_filing_desktop.png';
import mobileImage from '../../assets/images/composed-bg/SMA_Filings_mobile.png';
import Footer from '../../layout-components/Footer';
import hero6 from '../../assets/images/hero-bg/hero-6.jpg';

const LandingPage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Fragment>
      <div className={clsx('hero-wrapper bg-composed-wrapper bg-white')}>
        <div className="header-nav-wrapper header-nav-wrapper-lg w-100 navbar-dark">
          <Container className="d-flex" fixed>
            <div className="header-nav-logo align-items-center d-flex justify-content-end">
              <div className="nav-logo">
                <Link to="/" title="CA">
                  <i>
                    <img alt="CA" src={projectLogo} style={{ paddingTop: 3 }} />
                  </i>
                </Link>
              </div>
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
                        Unstructured Data Terminal <br /> (UDT)
                      </h1>
                      <p className="font-size-lg text-black-50"> by Context Analytics, Inc. (CA)</p>
                      <p className="text-black">
                        CA has partnered with S&P Global Market Intelligence on 'Machine Readable Filings' (MRF). MRF
                        has turned SEC Edgar Filings into Textual Data at the Item, Section, Sub-Section, and Note level
                        with Historical Baselines going back to 2006. UDT is the first product using MRF to
                        allow for quick sorting by Sentiment, Change in Sentiment, and Change in Word Count.
                        UDT also provides filtering by Tabs for Recent Filings over the Last Week or at the
                        Total Doc or the Item Level including MD&A, Risk, Notes, and FSS.
                      </p>
                      <div className="divider border-2 border-dark mt-4 mb-2 border-light opacity-2 rounded-circle w-25" />
                      <div>
                        {user != null ? (
                          <Button
                            to="/home"
                            component={Link}
                            size="large"
                            className="py-3 px-5 mt-2"
                            color="primary"
                            variant="contained"
                            title="Terminal">
                            <span className="btn-wrapper--label">Terminal</span>
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
                        Disclaimer: Context Analytics, Inc. is not an investment advisor, broker, or dealer, and
                        therefore does not provide any investment advice, nor does it participate in the offer, sale, or
                        distribution of securities. CA does not provide trading or investment advice. CA is not liable
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
      <div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default LandingPage;
