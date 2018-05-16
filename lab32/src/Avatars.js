import React from 'react';
import './avatar.css'

class Avatars extends React.Component {

  render(){
    const listAvatars = this.props.passAvatars.map(
      a =>  <div key={a}>
              <img onClick={this.props.passHandleAvatar}  className="avatarImg" src={a} alt="not found" />
            </div>
    );

  	return (
        <div>
          <h2 className="SelectAvatarTxt">Select Avatar</h2>
          <div className="containerAvatar">{listAvatars}</div>
        </div>
  	)
  }
}

export default Avatars;
