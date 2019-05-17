import React, { Component } from 'react';

// GET FIREBASE DATA
import { myDatabase } from '../../firebase';

// IMPORT COMPONENTS
import VideoListCard from '../VideoListCard';

class Home extends Component {
  
  state = {
    exercise: [],
    routines: [],
    showAvailableRoutines: false,
    selectedVideo: ''
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

  
  hideAvailableRoutines = () => {
    this.setState({
      showAvailableRoutines: false
    });
  }

  showAvailableRoutines = (videoId) => {
    console.log(`show available routine fired with video ${videoId}`);
    this.setState({
      showAvailableRoutines: true,
      selectedVideo: videoId
    });
  }

  

  selectRoutineToAddTo = (routineId) => {
    const videoId = this.state.selectedVideo

    this.state.routines.map( item => {
      if ( item.id === routineId ) {

        let myArray = [ ...item.routineItems, videoId ]
        console.log(`Video with id ${videoId} will be added to routine of ${routineId} with ${myArray}`);
  
        myDatabase.collection('routine').doc(routineId).update( { routineItems: myArray } )
        .then( () => console.log('Data Updated'))
        .catch( (e) => console.log(e, 'Data update failed') );
        }

    });
    
    this.hideAvailableRoutines();
  }



  render() {
    let videoInfo = this.state.exercise;
    let routines = this.state.routines;

    return (
      <div className="video-list__items">
      
        { 
          videoInfo.map( (exercise) => {
            return(
              <VideoListCard 
                key={exercise.id} 
                exercise={exercise} 
                showAvailableRoutines={this.showAvailableRoutines}
              />
            );
          }) 
        }
        {
          this.state.showAvailableRoutines && 
          
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
            {
              routines.map( routine => {
                return(
                  <div onClick={ () => this.selectRoutineToAddTo(routine.id) }>{routine.routineName}</div>
                );
              })
            }
            <button onClick={this.hideAvailableRoutines}>X</button>

            </div>
        </div>

        }
        
        
      </div>
    )
  }
}
  

export default Home;

