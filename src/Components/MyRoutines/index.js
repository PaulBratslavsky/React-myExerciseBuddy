import React, { Component } from 'react';
import { myDatabase } from '../../firebase';
import SingleRoutine from '../SingleRoutine';
import AddNewRoutine from '../AddRoutine';


class MyRoutines extends Component {

  state = {
    routines: [],
    exercise: []
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

    // GET EXERCISE
    myDatabase.collection('exercise').get().then( (snapshot) => {
      snapshot.docs.forEach( item => {

        let myObject = item.data();
        
        // Add unique id to my object
        myObject.id = item.id;

        this.setState( prevState => {
          return({
            exercise: [...prevState.exercise, myObject ]
          });
        });
      });

    });

  }
  render() {

    const routines = this.state.routines;
    // const exercises = this.state.exercise;
    

    return (
      <div className="video-list__items">
          <AddNewRoutine />
          {
            routines.map( (routine) => {

              return(
                <SingleRoutine routine={routine}/>
              );
            })
          }
      </div>
    )
  }
}

export default MyRoutines;
