import React, { Component } from 'react';
import firebase from './firebase.js';
import './profile.css'

class Profile extends Component{
  constructor() {
    super();
    this.state = {
      username: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //updates the profile name in database
  handleSubmit(event) {
    let db = firebase.database()
    event.preventDefault();
    db.ref('users/' + this.props.passUserInfo).update({
      'name': this.state.username,
    });
    console.log(this.props.passUserInfo)
  }


    render(){

      return(
        <form onSubmit={this.handleSubmit}>
          <div className="inputWrap">
            <div>
              <input className="inputStl"type="text" name="username" placeholder="change your name" onChange={this.handleChange} value={this.state.username}/ >
              <button className="subName">Submit</button>
              {/*<div>{this.props.passUserInfo}</div> //This props value comes from state in App.js*/}
            </div>
          </div>
        </form>
      );
    }
}


export default Profile
