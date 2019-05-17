import React, { Component } from 'react';
import ShowVideo from '../ShowVideo';

import { myDatabase } from '../../firebase';


// IMPORT CSS
import './videocard.css';


class VideoListCard extends Component {

  state = {
    showVideo: false,
    showRoutineList: false,
    videoLiked: this.props.exercise.videoLiked,
    
  }

  showVideo = () => {
    this.setState( prevState => {
      return { showVideo: !prevState.showVideo }
    });  
  }
/*
  deleteVideo = (videoId) => {
    console.log(`delete button clicked.  Video with Id ${videoId} will be deleted`);

    myDatabase.collection('exercise').doc(videoId).delete()
    .then( () => console.log('Data Deleted'))
    .catch( (e) => console.log(e, 'Data delete failed') );
  }
*/
  likeVideo = (videoId) => {
    if ( this.state.videoLiked === false ) {
      this.setState({
        videoLiked: true
      });

      myDatabase.collection('exercise').doc(videoId).update( { videoLiked: true } )
      .then( () => console.log('Data Updated'))
      .catch( (e) => console.log(e, 'Data update failed') );

      // console.log('video liked');

    } else if ( this.state.videoLiked === true ){
      this.setState({
        videoLiked: false
      });

      myDatabase.collection('exercise').doc(videoId).update( { videoLiked: false } )
      .then( () => console.log('Data Updated'))
      .catch( (e) => console.log(e, 'Data update failed') );

      // console.log('video unliked');
    }
  }

  render() {

    // handles heart css
    const videoLiked = (x) => {
      if (x === false) {
        return "far fa-heart";
      } else if ( x === true ) {
        return  "fas fa-heart";
      } 
    }

    return (
      <div className="video-list__item">
        
        {
          (this.state.showVideo) && <ShowVideo item={this.props.exercise} />
        }

        <div className="title-button-container">
          <div className="video-title">
            <h1>{this.props.exercise.videoTitle}</h1>
          </div>

          <div className="video-buttons">
            <i onClick={() => { this.props.showAvailableRoutines(); this.props.setSelectedExerciseToState(this.props.exercise.videoTitle); } } className="add-to-routine far fa-plus-square"></i>
            <i onClick={this.showVideo} className="play-video fas fa-video"></i>
            <i onClick={() => { this.likeVideo(this.props.exercise.id) } } className={`add-to-workout ${videoLiked(this.state.videoLiked)}`}></i>
            <i onClick={() => { this.props.deleteVideo(this.props.exercise.id) }} className="delete-video far fa-trash-alt"></i>
          </div>
        </div>

        <div className="video-description">  
          <p>{this.props.exercise.videoDescription}</p>
        </div>
      </div>
    )
  }
}

export default VideoListCard;
