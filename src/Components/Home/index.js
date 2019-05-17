import React, { Component } from 'react';

// GET FIREBASE DATA
import { myDatabase } from '../../firebase';

// IMPORT COMPONENTS
import VideoListCard from '../VideoListCard';
import ShowAllRoutines from '../ShowAllRoutines';

class Home extends Component {
  
  state = {
    exercise: [],
    routines: [],
    showAvailableRoutines: false,
    selectedExercise: ''
  }

  componentDidMount() {

    this.getExerciseFromDatabase();
    this.getRoutinesFromDatabase();

    
  }

  getExerciseFromDatabase = () => {
    // GET EXERCISE
    myDatabase.collection('exercise').get().then( (snapshot) => {
      snapshot.docs.forEach( item => {

        let myObject = item.data();
        console.log(myObject, 'From get exercise from database');
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

  getRoutinesFromDatabase = () => {
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

  deleteVideo = (videoId) => {
    console.log(`delete button clicked.  Video with Id ${videoId} will be deleted`);

    myDatabase.collection('exercise').doc(videoId).delete()
    .then( () => { 
      console.log('Data Deleted');
      this.getExerciseFromDatabase();
     } )
    .catch( (e) => console.log(e, 'Data delete failed') );
  
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
                deleteVideo={this.deleteVideo}
                setSelectedExerciseToState={this.setSelectedExerciseToState}
              />
            );
          }) 
        }

        {
          this.state.showAvailableRoutines && 
          <ShowAllRoutines 
            selectRoutineToAddTo={this.selectRoutineToAddTo}
            hideAvailableRoutines={this.hideAvailableRoutines}
            routines={this.state.routines}  
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