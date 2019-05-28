import React, { Component } from 'react'

class AddNewRoutine extends Component {

  state = {
    hideForm: true
  }

  showFormOnClick = () => {
    this.setState({
      hideForm: false
    });
  }

  cancelFormOnClick = () => {
    this.setState({
      hideForm: true
    });
  }


  renderFormHelper = () => {
    if (this.state.hideForm) {
      
      const buttonContainer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }
      
      const showFormButton = {
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#222831',
        color: '#eeeeee',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }

      const span = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginRight: '0.5rem'
      }

      return(
        <div className="button-container" style={buttonContainer}>
          <button onClick={this.showFormOnClick} className="button" style={showFormButton}>
            <span style={span}>Add New Routine</span>
            <i style={{fontSize: '2rem'}}class="fas fa-folder-plus"></i>
          </button>
        </div>
      );
    } else {
      const formContainer = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        zIndex: '300',
        backgroundColor: '#EEEEEE',
        padding: '1rem'
      }
      return(
        <div className="form-container" style={formContainer}>
          <form className="add-routine__form">
            <h1>this is form</h1>
          <button onClick={this.cancelFormOnClick}>X</button>
        </form>
        </div>
        
      );
    }
  }

  
  render() {
    return (
      <div className="add-routine">
        {this.renderFormHelper()}
      </div>
    )
  }
}

export default AddNewRoutine;
