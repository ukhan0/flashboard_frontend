import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import hero9 from '../../assets/images/hero-bg/hero-9.jpg';
import { NavLink as RouterLink } from 'react-router-dom';
import smaLogo from '../../assets/images/logos/ca-logo-white.png';
const SmaDescription = () => {
  return (
    <>
      <div className="hero-wrapper w-100 bg-composed-wrapper bg-plum-plate min-vh-100">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div className="bg-composed-wrapper--image" style={{ backgroundImage: 'url(' + hero9 + ')' }} />
          <div className="bg-composed-wrapper--bg bg-premium-dark opacity-5" />
          <div className="bg-composed-wrapper--content p-5">
            <div className="mt-3 mb-5 d-flex align-items-center justify-content-center">
              <img alt={'CA'} src={smaLogo} width={150} />
            </div>
            <div className="text-white mt-3">
              <h1 className="display-2 mb-3 font-weight-bold">UDT<sup>©</sup> using Machine Readable Filings (MRF)</h1>
              <p className="font-size-lg text-white-100">by Context Analytics, Inc. (CA)</p>
              <p className="font-size-md mb-0 text-white-100">
                CA has partnered with S&P Global Market Intelligence on 'Machine Readable Filings' (MRF). MRF has
                turned SEC Edgar Filings into Textual Data at the Item, Section, Sub-Section, and Note level with
                Historical Baselines going back to 2006. Unstructured Data Terminal is the first product using MRF to
                allow for quick sorting by Sentiment, Change in Sentiment, and Change in Word Count. UDT also provides
                filtering by Tabs for Recent Filings over the Last Week or at the Total Doc or the Item Level including
                MD&A, Risk, Notes, and FSS.
              </p>
              <div className="divider border-2 my-5 border-light opacity-2 rounded w-25" />
              <div>
                <Button
                  size="large"
                  className="text-white"
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/LandingPage">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-left']} />
                  </span>
                  <span className="btn-wrapper--label">Back to dashboard</span>
                </Button>
                <small className="d-block pt-3">
                  Disclaimer: Context Analytics, Inc. is not an investment advisor, broker, or dealer, and
                  therefore does not provide any investment advice, nor does it participate in the offer, sale, or
                  distribution of securities. CA does not provide trading or investment advice. CA is not liable for
                  any loss or damage caused by any reliance on information obtained in this report , in our website, or
                  in our communications.
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-footer pb-4">
          <Tooltip arrow title="Linkedin">
            <IconButton
              href="https://www.linkedin.com/company/social-market-analytics-inc-/"
              color="inherit"
              size="medium"
              variant="outlined"
              className="text-white-50">
              <FontAwesomeIcon icon={['fab', 'linkedin']} className="font-size-md" />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Twitter">
            <IconButton
              href="https://twitter.com/sma_alpha"
              color="inherit"
              size="medium"
              variant="outlined"
              className="text-white-50">
              <FontAwesomeIcon icon={['fab', 'twitter']} className="font-size-md" />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title="Youtube">
            <IconButton
              href="https://www.youtube.com/playlist?list=PLhd85gB2KvB4ENWZmP2uX7zpYBmQi9Mi5"
              color="inherit"
              size="medium"
              variant="outlined"
              className="text-white-50">
              <FontAwesomeIcon icon={['fab', 'youtube']} className="font-size-md" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
export default SmaDescription;
