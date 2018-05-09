import React, {Component} from 'react';
import './highscore.css'


class Highscore extends Component{
  render(){
    const listNames = this.props.AllUsers.map(
      u =>  <div className="scoreWrapper" key={u.uniqueID}>
              <div className="userNameInfo">{u.name}</div>
              <div>{u.score}</div>
            </div>
    )
    return(
      <div>
        <h3 className="highscoreTxt">Highscore</h3>
        <div className="scoreDiv">{listNames}</div>
      </div>
    );
  }
}

export default Highscore;
