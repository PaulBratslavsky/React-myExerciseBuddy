import React, { Component } from 'react';

// GET FIREBASE DATA
import { myDatabase } from '../../firebase';

// IMPORT COMPONENTS
import VideoListCard from '../VideoListCard';

class Home extends Component {
  
  state = {
    exercise: [],
    routines: [],
    currentRoutineItems: ['test']
  }

  componentDidMount() {

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

  addVideoToRoutine = (videoId, routineId) => {
    console.log(`Video with id ${videoId} and routine of ${routineId}`);

    this.setState( (prevState) => {
      return {
        currentRoutineItems: [...prevState.currentRoutineItems, videoId]
      }
    });
    
    myDatabase.collection('routine').doc(routineId).update( { routineItems: [...this.state.currentRoutineItems] } )
      .then( () => console.log('Data Updated'))
      .catch( (e) => console.log(e, 'Data update failed') );

  }

  render() {

    let videoInfo = this.state.exercise;

    return (
      <div className="video-list__items">
        { 
          videoInfo.map( (exercise) => {
            return(
              <VideoListCard 
                key={exercise.id} 
                exercise={exercise} 
                addVideoToRoutine={this.addVideoToRoutine}
              />
            );
          }) 
        }
      </div>
    )
  }
}
  

export default Home;

