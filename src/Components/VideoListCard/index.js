import React, { Component } from 'react';
import ShowVideo from '../ShowVideo';

import { myDatabase } from '../../firebase';


// IMPORT CSS
import './videocard.css';


class VideoListCard extends Component {

  state = {
    showVideo: false,
    videoLiked: this.props.item.videoLiked
  }

  showVideo = () => {
    this.setState( prevState => {
      return { showVideo: !prevState.showVideo }
    });  
    console.log('Show video clicked');
  }

  likeVideo = (videoId) => {
    if ( this.state.videoLiked === false ) {
      this.setState({
        videoLiked: true
      });

      myDatabase.collection('exercise').doc(videoId).update( { videoLiked: true } )
      .then( () => console.log('Data Updated'))
      .catch( (e) => console.log(e, 'Data update failed') );

      console.log('video liked');

    } else if ( this.state.videoLiked === true ){
      this.setState({
        videoLiked: false
      });

      myDatabase.collection('exercise').doc(videoId).update( { videoLiked: false } )
      .then( () => console.log('Data Updated'))
      .catch( (e) => console.log(e, 'Data update failed') );

      console.log('video unliked');
    }

    /*
    this.setState( prevState => {
      return { videoLiked: !prevState.videoLiked }
    });  */
    console.log(`Video Added btn clicked for vidoe ${videoId}`);
  }

  render() {

    let videoLiked = (x) => {
      if (x === false) {
        return "far fa-heart";
      } else if ( x === true ) {
        return  "fas fa-heart";
      } 
    }

    return (
      <div className="video-list__item">
        
        {
          (this.state.showVideo) && <ShowVideo item={this.props.item} />
        }

        <div className="title-button-container">
          <div className="video-title">
            <h1>{this.props.item.videoTitle}</h1>
          </div>

          <div className="video-buttons">
            <i onClick={this.showVideo} className="play-video fas fa-video"></i>
            <i onClick={() => { this.likeVideo(this.props.item.id) } } className={`add-to-workout ${videoLiked(this.state.videoLiked)}`}></i>
            <i className="delete-video far fa-trash-alt"></i>
          </div>
        </div>

        <div className="video-description">  
          <p>{this.props.item.videoDescription}</p>
        </div>
      </div>
    )
  }
}

export default VideoListCard;
