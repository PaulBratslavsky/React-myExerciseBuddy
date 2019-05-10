import React, { Component } from 'react'
import Header from '../Header';
import Menu from '../Menu';

class MenuToggle extends Component {

  state = {
    hideMenu: true
  };

  showMenu = () => {
    console.log('Button clicked');
    this.setState( prevState => {
      return { hideMenu: !prevState.hideMenu }
    });  
  }

  render() {
    
       if ( this.state.hideMenu === true ) {
        return(
          <Header showMenu={this.showMenu} />
        ); 
      } else {
        return(
          <Menu showMenu={this.showMenu} />
        );
      }
      
   }
  }



export default MenuToggle;