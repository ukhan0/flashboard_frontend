import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Card, Button, Tooltip, Divider } from '@material-ui/core';

export default function LivePreviewExample() {
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} className="pt-3">
            <div className="divider-v divider-v-md" />
            <Grid container spacing={4} className="mt-2">
              <Grid item xs={6}>
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="font-size-xxl text-success"
                    />
                  </div>
                  <div className="mt-2 line-height-sm">
                    <b className="font-size-lg">2,345</b>
                    <span className="text-black-50 d-block">users</span>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xxl text-info"
                    />
                  </div>
                  <div className="mt-2 line-height-sm">
                    <b className="font-size-lg">$9,693</b>
                    <span className="text-black-50 d-block">revenue</span>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Divider className="my-3" />
            <div className="text-center d-flex align-items-center justify-content-center mb-3">
              <Tooltip arrow title="Menu Example">
                <Button
                  color="primary"
                  variant="outlined"
                  className="m-1 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-50 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'building']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
              <Tooltip arrow title="Menu Example">
                <Button
                  color="primary"
                  variant="outlined"
                  className="m-1 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-50 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'lightbulb']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
              <Tooltip arrow title="Menu Example">
                <Button
                  color="primary"
                  variant="outlined"
                  className="m-1 d-inline-flex align-items-center justify-content-center text-center font-size-xxl d-50 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'object-group']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="pt-3">
            <Grid container spacing={4} className="mt-2">
              <Grid item xs={6}>
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon
                      icon={['far', 'user']}
                      className="font-size-xxl text-success"
                    />
                  </div>
                  <div className="mt-2 line-height-sm">
                    <b className="font-size-lg">2,345</b>
                    <span className="text-black-50 d-block">users</span>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="text-center">
                  <div>
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xxl text-info"
                    />
                  </div>
                  <div className="mt-2 line-height-sm">
                    <b className="font-size-lg">$9,693</b>
                    <span className="text-black-50 d-block">revenue</span>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Divider className="my-3" />
            <div className="text-center mb-3">
              <Tooltip arrow title="Menu Example">
                <Button
                  color="inherit"
                  variant="outlined"
                  className="m-1 d-inline-flex text-white border-0 align-items-center justify-content-center bg-sunny-morning text-center font-size-xxl d-50 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'comment-dots']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
              <Tooltip arrow title="Menu Example">
                <Button
                  color="inherit"
                  variant="outlined"
                  className="m-1 d-inline-flex text-white border-0 align-items-center justify-content-center bg-strong-bliss text-center font-size-xxl d-50 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'question-circle']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
              <Tooltip arrow title="Menu Example">
                <Button
                  color="inherit"
                  variant="outlined"
                  className="m-1 d-inline-flex text-white border-0 align-items-center justify-content-center bg-night-sky text-center font-size-xxl d-50 rounded">
                  <FontAwesomeIcon
                    icon={['far', 'lightbulb']}
                    className="font-size-lg"
                  />
                </Button>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Fragment>
  );
}
