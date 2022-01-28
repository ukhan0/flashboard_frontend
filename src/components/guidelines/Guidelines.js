import React from 'react';
import GuidelineVideo from './GuidelineVideo';
import { videosData } from './videosData';

const Guidelines = () => {
  return (
    <div>
      {videosData.map(video => {
        return (
          <>
            <GuidelineVideo id={video.id} videoId={video.videoId} title={video.title} description={video.description} />
          </>
        );
      })}
    </div>
  );
};

export default Guidelines;
