import React from 'react';
import './Nav.css';
import firebase from './firebase.js';

import './Nav.css';

class Nav extends React.Component{
  constructor() {
    super();
    this.state = {
      username: '',
      nameChange: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleChangeName = this.toggleChangeName.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


    toggleChangeName(){
      if(this.state.nameChange === false){
        this.setState({nameChange: true})
      }else{
        this.setState({nameChange: false})
      }
      console.log(this.state.nameChange);
    }


  //updates the profile name in database
  handleSubmit(event) {
    let db = firebase.database()
    event.preventDefault();
    db.ref('users/' + this.props.passUserId).update({
      'name': this.state.username,
    });
    console.log(this.props.passUserId)
  }


  render(){
    return(

      <div className="profileInfo">
        {this.state.nameChange ?
          <form onSubmit={this.handleSubmit}>
          <input className="inputStl"type="text" name="username" placeholder="change your name" onChange={this.handleChange} value={this.state.username}/ >
          <button className="subName">Submit</button>
          {/*<div>{this.props.passUserInfo}</div> //This props value comes from state in App.js*/}
        </form>: null }
      <button className="buttonLog" onClick={this.props.onClick}>Log Out</button>
        <div onClick={this.toggleChangeName} className="userNameStl">{this.props.children}</div>
        <img src={this.props.src} alt="finns ingen bild hehhe"/>
      </div>
    )
  }
};

export default Nav;
