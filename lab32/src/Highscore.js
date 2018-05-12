import React, {Component} from 'react';
import './highscore.css'

class Highscore extends Component{
  render(){
    const listNames = this.props.AllUsers.sort((a, b) => b.score - a.score).map(
      u =>  <div className="scoreWrapper" key={u.uniqueID}>
              <div className="userNameInfo">{u.name}</div>
              <div>{u.score}p</div>
            </div>
    )
    return(
      <div className="containerHighscore">
        <div>
          <div className="highscoreDiv">
            <h3 className="highscoreTxt">Highscore</h3>
          </div>
          <div className="scoreDiv">{listNames}</div>
        </div>
      </div>
    );
  }
}

export default Highscore;
