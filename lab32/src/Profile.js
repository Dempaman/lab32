import React, { Component } from 'react';
import firebase from './firebase.js';
import Avatars from './Avatars.js';
import './profile.css'

class Profile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profileImg: '',
      showEdit: false,
      saveAvatar: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleProfileImgChange = this.handleProfileImgChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.name)
  }

  handleProfileImgChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAvatar(event){
  let imgSrc =  event.target.src
    //console.log(event.target.src)
    this.setState({saveAvatar: imgSrc})
    this.setState({profileImg: imgSrc})
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
      });
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

  toggle() {
      this.setState({
        showEdit: !this.state.showEdit
      });
    }

    render(){

      let showEdit = {
        display: this.state.showEdit ? "block" : "none"
      };

      return(
          <div className="inputWrap">
            <div className="headProfStl">
              <h3>Profile</h3>
              <h2>Score {this.props.passUserScore}p</h2>
            </div>
            <div className="inputWrap2">
              <div className="profileImgWrap">
                <img src={this.props.passUserImg} alt="Not found"/>
              </div>
              <div className="profileTxt">
                <div>{this.props.passUserName}</div>
                <div>{this.props.passUserEmail}</div>
              </div>
              <button className="editBtn" onClick={this.toggle.bind(this)} > Edit </button>
            </div>
            <div className="editDivBackground" style={ showEdit }>
              <div className="editDiv" >
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <input className="inputStl" type="text" name="username" placeholder="change your name" onChange={this.handleChange} value={this.state.username}/ >
                    <input className="inputStl" type="text" name="profileImg" placeholder="change your profile image" onChange={this.handleProfileImgChange} value={this.state.profileImg}/ >
                    <button className="subName">Submit</button>
                    <button className="close" onClick={this.toggle.bind(this)} ></button>
                    <Avatars passHandleAvatar={this.handleAvatar} passAvatars={this.props.passAvatars}/>
                  </div>
                </form>
              </div>
            </div>
          </div>
      );
    }
}


export default Profile
