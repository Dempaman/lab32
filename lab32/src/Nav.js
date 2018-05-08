import React, { Component } from 'react';
import './Nav.css';
class Nav extends React.Component{
  constructor(props){
    super(props);


  }
  render(){
    return(
      <div className="profileInfo">
      <button className="buttonLog" onClick={this.props.onClick}>Log Out</button>
        <img src={this.props.src} alt="finns ingen bild hehhe"/>
      </div>
    )
  }
};








export default Nav;
