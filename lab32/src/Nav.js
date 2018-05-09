import React from 'react';
import './Nav.css';
class Nav extends React.Component{
  render(){
    return(
      <div className="profileInfo">
      <button className="buttonLog" onClick={this.props.onClick}>Log Out</button>
        <img src={this.props.src} alt="finns ingen bild hehhe"/>
        <div className="userNameStl">{this.props.children}</div>
      </div>
    )
  }
};








export default Nav;
