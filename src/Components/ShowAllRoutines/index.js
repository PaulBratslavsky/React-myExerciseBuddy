import React from 'react';
import './showallroutines.css';

const ShowAllRoutines = (props) => {
  return (
    <div className='show-all-routines-container'>
      <div className='window'>
        <h2>Your Routines</h2>
        <p>Click on routine to add exercise.</p>
          {
            props.routines.map( (routine, index) => {
              return(
                <div className="single-routine" onClick={ () => props.selectRoutineToAddTo(routine.id) } key={index}>{routine.routineName}</div>
              );
            })
          }

          <i onClick={props.hideAvailableRoutines} class="far fa-times-circle"></i>

          </div>
    </div>
  )
}

export default ShowAllRoutines;
