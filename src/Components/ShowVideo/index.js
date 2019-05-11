import React from 'react';
import './showvideo.css';

// IMPORT HELPER FUNCTION 
import { getVideoId } from '../../_Functions/getVideoId';


const ShowVideo =  (props) => {
  return(
    <div className="video-wrapper">
      <iframe 
        width="560" 
        height="315" 
        src={`https://www.youtube.com/embed/${getVideoId(props.item.videoUrl)}`} 
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default ShowVideo;


