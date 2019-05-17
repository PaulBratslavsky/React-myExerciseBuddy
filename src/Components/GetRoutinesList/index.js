import React, { Component } from 'react';
// GET FIREBASE DATA
import { myDatabase } from '../../firebase';

class GetRoutinesList extends Component {

  state = {
    currentRoutineId: '',
    routines: []
  }

  componentDidMount() {
    // GET ROUTINES
    myDatabase.collection('routine').get().then( (snapshot) => {
      snapshot.docs.forEach( item => {

        let myObject = item.data();
        
        // Add unique id to my object
        myObject.id = item.id;

        this.setState( prevState => {
          return({
            routines: [...prevState.routines, myObject ]
          });
        });
      });

    });
  }

  onClickAddExerciseToThisRoutine = (routineId, selectedExercise) => {
    console.log(`add ${selectedExercise} exercise to Routine  with id ${routineId} Clicked`);

    let myArray = this.state.routines.filter( item => ( item.id === routineId ) );
    
    console.log(Array.isArray(myArray), 'from on click add exercise');
    let myExerciseList =  [ ...myArray[0].routineItems ];
    
    console.log(Array.isArray(myExerciseList), 'old array');
    let updatedArray = [ ...myExerciseList, selectedExercise ]
    
    console.log(Array.isArray(updatedArray), 'new array');

    myDatabase.collection('routine').doc(routineId).update( { routineItems: updatedArray } )
    .then( () => console.log('Data Updated'))
    .catch( (e) => console.log(e, 'Data update failed') );
    
    this.props.hideAvailableRoutines();

  }

  showRoutineListHelper = (routines) => {
  
    return(
      <ul>
        {routines.map( (routine) => {
          return<li onClick={ () => { this.onClickAddExerciseToThisRoutine(routine.id, this.props.selectedExercise) }} key={routine.id}>{routine.routineName}</li>
        })}
      </ul>
    );

  }
  
  render() {
    return (
      <div style={{
        background: 'rgb(34, 40, 49, 0.9)',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div>
        <h2>Show Routine</h2>
        
        <div style={{background: '#eeeeee'}}>
          { this.showRoutineListHelper(this.state.routines) }
        </div>
        
        <button onClick={this.props.hideAvailableRoutines}>X</button>

          </div>
      </div>
    )
  }
}

export default GetRoutinesList;


