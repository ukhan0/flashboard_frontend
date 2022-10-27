import React, { useEffect } from 'react';
import GuidelineVideo from './GuidelineVideos';
import { videosData } from './videosData';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedVideo } from '../../reducers/Guidelines';

const Guidelines = () => {
  const { selectedVideo } = useSelector(state => state.Guidelines);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedVideo) {
      const element = document.getElementById(selectedVideo);
      if (element) {
        element.scrollIntoView();
        dispatch(setSelectedVideo(null));
      };
    };
  }, [dispatch, selectedVideo]);
  return (
    <div>
      {videosData.map(video => {
        return (
          <div key={video.videoId}>
            <GuidelineVideo id={video.id} videoId={video.videoId} title={video.title} description={video.description} />
          </div>
        );
      })}
    </div>
  );
};

export default Guidelines;
