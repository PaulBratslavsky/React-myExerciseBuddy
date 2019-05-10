import React, { Component } from 'react';
import { myDatabase } from '../../firebase';
import VideoListCard from '../VideoListCard';

class Home extends Component {
  
  state = {
    exercise: []
  }

  componentDidMount() {

    myDatabase.collection('exercise').get().then( (snapshot) => {
      snapshot.docs.forEach( item => {
        this.setState( prevState => {
          return({
            exercise: [...prevState.exercise, item.data()]
          });
        });
      });

  });
  }
  render() {

    let videoInfo = this.state.exercise;

    return (
      <div className="video-list__items">
        { 
          videoInfo.map( item => {
            return(
              <VideoListCard item={item}/>
            );
          }) 
        }
      </div>
    )
  }
}
  

export default Home;

