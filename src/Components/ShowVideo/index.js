import React from 'react';

// IMPORT HELPER FUNCTION 
import { getVideoId } from '../../_Functions/getVideoId';


const ShowVideo =  (props) => {
  return(
    <div className="videoWrapper">
      <iframe 
        width="560" 
        height="315" 
        src={`https://www.youtube.com/embed/${getVideoId(props.item.videoUrl)}`} 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  )
}

export default ShowVideo;


