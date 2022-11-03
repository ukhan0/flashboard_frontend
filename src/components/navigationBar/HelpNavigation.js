import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { setSelectedVideo } from '../../reducers/Guidelines';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function HelpNavigation(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSelection = path => {
    props.onClose();
    dispatch(setSelectedVideo(path));
    history.push('/guideline');
  };
  return (
    <Fragment>
      <Grid container direction="row" justify="flex-end" alignItems="flex-end">
        <Grid item>
          <div>
            <Box component="span" pr="2">
              {/* <IconButton onClick={handleClick2} color="inherit" className="btn-inverse mx-1 d-50">
                <FontAwesomeIcon icon={['far', 'question-circle']} className="font-size-xxl" />
              </IconButton> */}

              <ul className="list-group list-group-flush text-left bg-transparent">
                <li className="list-group-item rounded-top">
                  <div className="align-box-row">
                    <div className="pl-2">
                      <small
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleSelection('home-page');
                        }}
                        className="font-weight-bold">
                        {' '}
                        Home Page
                      </small>

                      <div className="divider my-2"></div>
                      <small
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleSelection('filing-comparison');
                        }}
                        className="font-weight-bold">
                        {' '}
                        Filing Comparison
                      </small>
                    </div>
                  </div>
                </li>
              </ul>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
}
