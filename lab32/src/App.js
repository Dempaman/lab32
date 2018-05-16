import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.js';
import firebase, { auth, provider } from './firebase.js';
import Tab from './Tab.js';
import LoginModal from './LoginModal.js';
import Highscore from './Highscore.js';
import Preloading from './Preloading.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedInUserId: '',
      name: '',
      profileImg: '',
      userScore: '',
      userEmail: '',
      AllUsers: [],
      loggedInUser: [],
      showHighscore: false,
      avatars: [],
      hide: ''
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }

  toggle() {
  		this.setState({
  			showHighscore: !this.state.showHighscore
  		});
  	}

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  //Google Login
  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({user});
      this.addUserInfoToFirebase();
      this.addAvatarsToState()
    });
  }


  addUserInfoToFirebase(uidUser){
    firebase.database().ref().child('/users/').once('value').then(function(snapshot) {
      let listt = [];
      snapshot.forEach(function(child) {
        listt.push(child.val().uniqueID);
      });
      //console.log("listt ",listt

      if(listt.includes(this.state.user.uid)){
        console.log("User already in database");
      }else{
        console.log("New user - Added to database");
        firebase.database().ref('users/'+ this.state.user.uid).set({
          'name': this.state.user.displayName,
          'img': this.state.user.photoURL,
          'score': 0,
          'uniqueID': this.state.user.uid,
          'email': this.state.user.email,
        });
      }
    }.bind(this));
  }

  addUserInfoToState(){
    firebase.database().ref('/users/').once('value').then(function(snapshot) {
      let users = [];
      snapshot.forEach(function(child) {
        users.push(child.val());
      });
      this.setState({AllUsers: users});
      }.bind(this));
  }

  addAvatarsToState(){
    firebase.database().ref('/avatar/').once('value').then(function(snapshot) {
      let avatar = [];
      snapshot.forEach(function(child) {
        avatar.push(child.val());
      });
      this.setState({avatars: avatar});
      //console.log("this.state.AllUsers", this.state.avatar)
      }.bind(this));
  }

  updateLoggedInUserInfo(){
    firebase.database().ref('/users/').once('value').then(function(snapshot) {
      let user = [];
      snapshot.forEach(function(child) {
        user.push(child.val());
      });
      let findUser = user.find(item => item.uniqueID === this.state.loggedInUserId );

      this.setState({loggedInUser: user});
      this.setState({name: findUser.name });
      this.setState({profileImg: findUser.img})
      this.setState({userScore: findUser.score})
      }.bind(this));
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.setState({loggedInUserId: this.state.user.uid })
        this.addAvatarsToState();
        this.addUserInfoToState(); //Add the user names and scores in state

        firebase.database().ref().child('/users/' + this.state.user.uid).once('value').then(function(snapshot) {  //Takes a snapshot of the database and prints the username if there is someone logged in
          let snap = snapshot.val()
          if(snap){
            this.setState({name: snap.name})
            this.setState({profileImg: snap.img})
            this.setState({userScore: snap.score})
            this.setState({userEmail: snap.email})
            setTimeout(this.setState({hide: 'hide'}),2000);
          }
        }.bind(this));

        firebase.database().ref('/users/' + this.state.loggedInUserId).on('child_changed',function(snapshot) {//Takes a snapshot of the database if triggered and changes your profile name on the website
         this.updateLoggedInUserInfo()
       }.bind(this))

       firebase.database().ref('/users/').on('child_changed',function(snapshot) { //Listens to the databes and changes the web-data
           this.addUserInfoToState()
         }.bind(this))
      }
    });
  }


  render() {
    let showHighscore = {
			display: this.state.showHighscore ? "block" : "none"
		};

    return (
      <div>

        <div className="containerLoggedIn">
          {this.state.user ?
            <div>
              <Nav
                passUserId={this.state.loggedInUserId}
                src={this.state.profileImg}
                onClick={this.logout}>
                {this.state.name}
              </Nav>
              <div className={this.state.hide}>
                <Preloading />
              </div>
            </div>
          :
            <div className="alighItems">
              <button className="buttonLog" onClick={this.login}>Log In</button>
            </div>
          }                                                                               {/**  Checks if user is logged in or not **/}
        </div>
        <div style={ showHighscore }>
          <Highscore AllUsers={this.state.AllUsers}/>
        </div>
        {this.state.user ?
          <Tab
            passAvatars={this.state.avatars}
            passUserEmail={this.state.userEmail}
            passUserScore={this.state.userScore}
            passUserImg={this.state.profileImg}
            passUserName={this.state.name}
            passUserId={this.state.loggedInUserId}
            AllUsers={this.state.AllUsers}
          />
        :
          <LoginModal passLogin={this.login} />
        }
        <button className="toggleHighscore" onClick={this.toggle.bind(this)}>Highscore</button>   {/**  End of containerLoggedIn **/}
      </div>
    );
  }
}

export default App;
