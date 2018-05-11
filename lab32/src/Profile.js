import React, { Component } from 'react';
import firebase from './firebase.js';
import './profile.css'

class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profileImg: '',

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileImgChange = this.handleProfileImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleProfileImgChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  cancelCourse = () => {
  this.myFormRef.reset();
  }

  //updates the profile name in database
  handleSubmit(event) {
    let db = firebase.database()
    event.preventDefault();
    if(this.state.username.length > 5){
      event.target.reset();
      db.ref('users/' + this.props.passUserId).update({
        'name': this.state.username,
        //'img': this.state.profileImg,
      });
      console.log(this.props.passUserId)
      this.setState({username: ''});  //Removes input text after submitted text
      this.setState({profileImg: ''});
    }else{
      console.log("För kort namn")
    }
    if(this.state.profileImg.includes('.jpg', '.png')){
      event.target.reset();
      db.ref('users/' + this.props.passUserId).update({
        'img': this.state.profileImg,
      });
    }else{
      console.log("måste vara en jpg eller png format på bilden")
    }
  }

    render(){
      console.log(this.props.passUserId)
      return(
        <form onSubmit={this.handleSubmit}>
          <div className="inputWrap">
            <h3>Profile</h3>
            <div className="inputWrap2">
              <div className="profileImgWrap">
                <img src={this.props.passUserImg} alt="Not found"/>
              </div>
              <div>{this.props.passUserName}</div>
              <div>
                <input className="inputStl" type="text" name="username" placeholder="change your name" onChange={this.handleChange} value={this.state.username}/ >
                <input className="inputStl" type="text" name="profileImg" placeholder="change your profile image" onChange={this.handleProfileImgChange} value={this.state.profileImg}/ >
                <button className="subName">Submit</button>
              </div>
            </div>
          </div>
        </form>
      );
    }
}


export default Profile
