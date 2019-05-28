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
    selectedVideo: ''
  }

  componentDidMount() {
    this.getExerciseFromDatabase();
    this.getRoutinesFromDatabase();
  }

  getExerciseFromDatabase = () => {
    // GET EXERCISE
    myDatabase.collection('exercise').get().then( (snapshot) => {
      let exerciseVideos = snapshot.docs.map( item => {
        let myObject = item.data();
        // Add unique id to my object
        myObject.id = item.id;
        return myObject
      });

      this.setState({
        exercise: exerciseVideos
      });

      console.log('Get Exericse From Database Success');

    }).catch( (e) => console.log(e, 'Get Exercise From Databse Failed') );
  }

  getRoutinesFromDatabase = () => {
    // GET ROUTINES
    myDatabase.collection('routine').get().then( (snapshot) => {
      let exerciseRoutines = snapshot.docs.map( item => {
        let myObject = item.data();
        // Add unique id to my object
        myObject.id = item.id;
        return myObject;
      });

      this.setState({
          routines: exerciseRoutines
      });

    }).catch( (e) => console.log(e, 'Get Routines From Database Failed') );
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

  showAvailableRoutines = (videoId) => {
    this.setState({
      showAvailableRoutines: true,
      selectedVideo: videoId
    });
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
FromDatabase = () => {
    // EMPTY ARRAY TO CONTAIN EXERCISE DATA
    let exerciseVideos = [];

    // GET EXERCISE FROM DATABASE
    myDatabase.collection('exercise').get().then( (snapshot) => {
      exerciseVideos = snapshot.docs.map( item => item.data() );

      this.setState({
        test: exerciseVideos
      });

    });
  }
  */