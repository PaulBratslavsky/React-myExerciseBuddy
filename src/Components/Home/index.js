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
    // EMPTY ARRAY TO CONTAIN EXERCISE DATA
    let exerciseVideos= [];

    // GET EXERCISE FROM DATABASE
    myDatabase.collection('exercise').get().then( (snapshot) => {
      
      // 
      snapshot.docs.forEach( item => {
        let myObject = item.data();
        // Add unique id to my object
        myObject.id = item.id;
        
        exerciseVideos = [ ...exerciseVideos,  myObject ];
      });

      this.setState({
        exercise: exerciseVideos
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
    // EMPTY ARRAY TO CONTAIN EXERCISE DATA
    let exerciseVideos= [];
    
    myDatabase.collection('exercise').doc(videoId).delete()
    .then( () => { 
      console.log('Data Deleted');
      
      myDatabase.collection('exercise').get().then( (snapshot) => {
      
        // 
        snapshot.docs.forEach( item => {
          let myObject = item.data();
          // Add unique id to my object
          myObject.id = item.id;
          
          exerciseVideos = [ ...exerciseVideos,  myObject ];
        });
  
        this.setState({
          exercise: exerciseVideos
        });
  
      });
      
    
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

