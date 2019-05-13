import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from './Components/Home';
import MyRoutines from './Components/MyRoutines';
import Layout from './HOC/Layout';

class Routes extends Component {
  render() {
    return(
      <Layout>
        <Switch> 
          <Route path="/" exact component={Home} />
          <Route path="/my-routnes" component={MyRoutines} />
        </Switch>
      </Layout>
    )
  }
}

export default Routes;
