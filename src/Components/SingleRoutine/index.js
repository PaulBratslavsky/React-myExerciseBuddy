import React, { Component } from 'react';
import './singleroutine.css';

class SingleRoutine extends Component {

  
  render() {
    const routine = this.props.routine;
    return (
      <div className="single-routine__item">
        <header className="title-button-container">
          <div className="single-routine-title">
            <h1>{routine.routineName}</h1>
          </div>

          <div className="single-routine-buttons">
            <div>
              <h2>X</h2>
            </div>
          </div>
        </header>
        
        <div className="single-routine-description">
          <p>{routine.routineDescription}</p>

          <ul className="exercise-list">
            {
              routine.routineItems.map( (exercise, index) => {
                return(
                  <li key={index}>{`${index + 1} ${exercise}`}</li>
                );
              })
            }
        </ul>

        </div>
        
        
      </div>
    )
  }
}

export default SingleRoutine;
