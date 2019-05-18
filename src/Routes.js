import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from './Components/Home';
import MyRoutines from './Components/MyRoutines';
import AddExercise from './Components/AddExercise';
import Layout from './HOC/Layout';

class Routes extends Component {
  render() {
    return(
      <Layout>
        <Switch> 
          <Route path="/" exact component={Home} />
          <Route path="/add-exercise" component={AddExercise} />
          <Route path="/my-routines" component={MyRoutines} />
        </Switch>
      </Layout>
    )
  }
}

export default Routes;
