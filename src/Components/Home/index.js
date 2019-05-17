import React, { Component } from 'react';

// GET FIREBASE DATA
import { myDatabase } from '../../firebase';

// IMPORT COMPONENTS
import VideoListCard from '../VideoListCard';
import GetRoutinesList from '../GetRoutinesList';

class Home extends Component {
  
  state = {
    exercise: [],
    routines: [],
    showAvailableRoutines: false,
    selectedExercise: ''
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

  
  hideAvailableRoutines = () => {
    this.setState({
      showAvailableRoutines: false
    });
  }

  showAvailableRoutines = () => {
    this.setState({
      showAvailableRoutines: true,
    });
  }

  setSelectedExerciseToState = (selectedExercise) => {
    this.setState({
      selectedExercise: selectedExercise,
    });
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
                showAvailableRoutines={this.showAvailableRoutines}
                setSelectedExerciseToState={this.setSelectedExerciseToState}
              />
            );
          }) 
        }
        { 
          this.state.showAvailableRoutines && 
          <GetRoutinesList 
            hideAvailableRoutines={this.hideAvailableRoutines}                 
            selectedExercise={this.state.selectedExercise}
          /> 
        }
        
        
      </div>
    )
  }
}
  

export default Home;

 /*
  getSelectedVideo = (videoId) => {
    this.setState({
      selectedVideo: videoId
    })
  }

  

  selectRoutineToAddTo = (routineId) => {
    const videoId = this.state.selectedVideo

    this.state.routines.forEach( item => {
      if ( item.id === routineId ) {

        let myArray = [ ...item.routineItems, videoId ]
  
        myDatabase.collection('routine').doc(routineId).update( { routineItems: myArray } )
        .then( () => console.log('Data Updated'))
        .catch( (e) => console.log(e, 'Data update failed') );
        }

    });
    
    this.hideAvailableRoutines();
  }

  */