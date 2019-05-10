import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Home from './Components/Home';
import Layout from './HOC/Layout';

class Routes extends Component {
  render() {
    return(
      <Layout>
        <Switch> 
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    )
  }
}

export default Routes;
