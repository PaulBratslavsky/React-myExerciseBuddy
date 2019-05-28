import React, { Component } from 'react';

// GET FIREBASE DATA
import { myDatabase } from '../../firebase';

// CSS
import './header.css';
import AddVideoButton from '../AddVideoButton';

class Header extends Component {

  state = {
    showAddVideoModal: false,
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
      this.setState(
        {
          videoDescription: '',
          videoTitle: '',
          videoUrl: ''
        }
      );

      // Does not rerender unless I reroute
      let { history } = this.props;

      history.push({
        pathname: '/'
      });

      console.log("Added document written with ID: ", docRef.id);
      this.handleCloseModal();
    })
    .catch( (error) => {
      console.error("Error adding document: ", error);
    });

  }


  handleOpenModal = () => {
    this.setState({
      showAddVideoModal: true
    });
  }

  handleCloseModal = () => {
    this.setState({
      showAddVideoModal: false
    });
  }

  render() {
    return (
      <header className="main-header">
        <div className="main-header__logo">
          <i class="fas fa-dumbbell"></i>
        </div>
  
        <div className="main-header__menu">
          <AddVideoButton handleOpenModal={this.handleOpenModal}/>
          <i id="menu-button" onClick={this.props.showMenu}class="fas fa-bars"></i>
        </div>


        {
          this.state.showAddVideoModal && 
          <div className="add-video-button-modal">
          <div className="window">
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

              <div className="button-group">
                <button class="button">
                  <span>Add Exercise</span>
                </button>
                <i onClick={this.handleCloseModal} class="far fa-times-circle"></i>
              </div>
                
            </form>
          </div>
        </div>
        }
        
      </header>
    )
  }
  
}

export default Header;