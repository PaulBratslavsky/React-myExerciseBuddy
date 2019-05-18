import React, { Component } from 'react';
import MenuToggle from '../../Components/MenuToggle';

class Layout extends Component {

  state = {

  };

  render() {
    return (
      <div id="main-view">
        <MenuToggle />
        {this.props.children}
      </div>
    )
  }
}

export default Layout;
