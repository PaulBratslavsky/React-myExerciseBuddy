import React, { Component } from 'react';
import ShowVideo from '../ShowVideo';


class VideoListCard extends Component {
  render() {
    return (
      <div className="video-list__item">
        <ShowVideo item={this.props.item}/>

        <div className="title-button-container">
          <div className="video-title">
            <h1>{this.props.item.videoTitle}</h1>
          </div>

          <div className="video-buttons">
            <i className="play-video fas fa-video"></i>
            <i className="add-to-workout far fa-plus-square"></i>
            <i className="delete-video far fa-trash-alt"></i>
          </div>
          <p>{this.props.item.videoDescription}</p>
        </div>
      </div>
    )
  }
}

export default VideoListCard;
