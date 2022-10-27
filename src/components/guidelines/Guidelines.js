import React, { useEffect } from 'react';
import GuidelineVideo from './GuidelineVideos';
import { videosData } from './videosData';
import { useSelector } from 'react-redux';

const Guidelines = () => {
  const { selectedVideo } = useSelector(state => state.User);
  useEffect(() => {
    const element = document.getElementById(selectedVideo);
    if (element) {
      element.scrollIntoView();
    };
  }, [selectedVideo]);
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
