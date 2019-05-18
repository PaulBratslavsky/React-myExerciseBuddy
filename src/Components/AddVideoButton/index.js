import React, { Component } from 'react';
import './addvideobutton.css';

class AddVideoButton extends Component {
  render() {
    return (
      <button onClick={this.props.handleOpenModal} class="button">
        <span>Add Exercise</span>
          <i class="fas fa-folder-plus"></i>
      </button>
    )
  }
}

export default AddVideoButton;
