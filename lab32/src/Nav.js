import React from 'react';
import './Nav.css';
class Nav extends React.Component{
  render(){
    return(
      <div className="profileInfo">
        <div className="loginBtnFix">
          <button className="buttonLog" onClick={this.props.onClick}>Log Out</button>
        </div>
        <div>
          <img src={this.props.src} alt="finns ingen bild hehhe"/>
        </div>
        <div className="userNameStl">{this.props.children}</div>
      </div>
    )
  }
};

export default Nav;
