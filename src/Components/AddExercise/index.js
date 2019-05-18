import React, { Component } from 'react';
import './addexercise.css';

// GET FIREBASE DATA
import { myDatabase } from '../../firebase';

class AddExercise extends Component {

  state = {
    videoTitle: '',
    videoDescription: '',
    videoUrl: '',
    videoLiked: false,
  }

  getVideoTitle = (event) => {
    this.setState({
      videoTitle: event.target.value
    });
  }

  getVideoDescription = (event) => {
    this.setState({
      videoDescription: event.target.value
    });
  }

  getVideoUrl = (event) => {
    this.setState({
      videoUrl: event.target.value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');

    // Add a new document with a generated id.
    myDatabase.collection("exercise").add({
      videoDescription: this.state.videoDescription,
      videoTitle:  this.state.videoTitle,
      videoUrl: this.state.videoUrl,
      videoLiked: this.state.videoLiked,
    })
    .then( (docRef) =>  {
      this.setState = {
        videoDescription: '',
        videoTitle: '',
        videoUrl: ''
      }
      // Does not rerender unless I reroute
      let { history } = this.props;

      history.push({
        pathname: '/'
      });

      console.log("Added document written with ID: ", docRef.id);
    })
    .catch( (error) => {
      console.error("Error adding document: ", error);
    });

    

    
  }

  render() {
    
    return (
      <div className="add-exercise-container">
        <div className="add-exerices-form-container">
          <h2>Add Exercise</h2>
          <form onSubmit={this.handleFormSubmit} >
            <div className="input-group">
              <input onChange={this.getVideoTitle} type="text" value={this.state.videoTitle} placeholder="Add Title"></input>
            </div>

            <div className="input-group">
              <textarea onChange={this.getVideoDescription} type="text" value={this.state.videoDescription} placeholder="Add Description"></textarea>
            </div>

            <div className="input-group">
              <input onChange={this.getVideoUrl} type="text" value={this.state.videoUrl} placeholder="Add Url"></input>
            </div>

              <button class="button">
                <span>Add Exercise</span>
                <i class="fas fa-folder-plus"></i>
              </button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddExercise;
