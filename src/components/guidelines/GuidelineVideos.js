import React, { Fragment } from 'react';
import { Container } from '@material-ui/core';

const GuidelineVideo = props => {
  return (
    <Fragment>
      <div id={props.id} className="bg-light pt-4">
        <Container className="py-3">
          <div className="card shadow-xxl mb-4">
            <div className="p-3 p-xl-5">
              <div className="d-flex card-header" id={props.id}>
                <div className="card-header--title font-size-md font-weight-bold py-2">{props.title}</div>
              </div>

              <div className="d-flex flex-column align-items-center">
                {
                  <iframe
                    id="video"
                    width="100%"
                    title="ComparisionPageLink"
                    height={`${window.innerHeight - 200}px`}
                    src={`https://www.youtube.com/embed/${props.videoId}`}
                    frameBorder="0"
                    allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                }

                <div className="pl-0 pl-xl-5 py-0 py-xl-2 text-center text-xl-left">
                  <div className="mb-4">
                    <p className="font-size-lg text-black-50">{props.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default GuidelineVideo;
