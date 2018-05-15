import React from 'react';
import './Quiz.css';
import firebase from './firebase.js';

class Quiz extends React.Component{
  constructor(){
    super();

    this.state={
      categorie: 'javascript',
      choosen: true,
      question: [],
      numberOfQuestions: 5,
      currentIndex: 0,
      bgColor: "#2773bd",
      currentScore: 0,
      time: {},
      seconds: 30,
      comboCheck: 0,
      play: true
    }
    this.timer = 0;
    this.errorSound = new Audio('http://soundbible.com/grab.php?id=669&type=mp3');

    this.answerCheckOne = this.answerCheckOne.bind(this);
    this.addQuestionToState = this.addQuestionToState.bind(this);
    this.chooseJs = this.chooseJs.bind(this);
    this.chooseCss = this.chooseCss.bind(this);
    this.chooseHtml = this.chooseHtml.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleOnOff = this.handleOnOff.bind(this);

  }

  chooseJs(){
    this.setState({
    categorie: 'javascript',
    choosen: false
    }, () => {
    this.addQuestionToState();
    this.startTimer();
    });
  }

  chooseCss(){
    this.setState({
    categorie: 'css',
    choosen: false
    }, () => {
    this.addQuestionToState();
    this.startTimer();
    });
  }

  chooseHtml(){
    this.setState({
    categorie: 'html',
    choosen: false
    }, () => {
    this.addQuestionToState();
    this.startTimer();
    });
  }

  addQuestionToState(){
    firebase.database().ref('categories/' + this.state.categorie).once('value').then(function(snapshot) {
      let questionList = [];
      snapshot.forEach(function(child) {
        questionList.push(child.val());
      });
      this.setState({question: questionList});
      }.bind(this));
  }

    componentDidMount() {
    this.addQuestionToState();
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    }

    componentWillUnmount(){
      clearInterval(this.timer);
    }


  answerCheckOne(e, score){
    clearInterval(this.timer);
    let answer = e.target.textContent.toString()/*parseInt(e.target.textContent);*/
    let correctAnswer = this.state.question[this.state.currentIndex].question.correct.toString() //parseInt(this.state.question[0].question.correct);

    if ( answer === correctAnswer ) {
      console.log("CORRECT");
      this.setState({comboCheck: this.state.comboCheck + 1})
      this.setState({bgColor: "limegreen"})
        if(this.state.comboCheck >= 3){ // IF COMBO THEN USER GETS 15 POINTS
          this.setState({currentScore: this.state.currentScore + 15})
          firebase.database().ref().child('/users/' + this.props.passUserId).update({ score: this.props.passUserScore + 15});
        }else{
          this.setState({currentScore: this.state.currentScore + 10})
          firebase.database().ref().child('/users/' + this.props.passUserId).update({ score: this.props.passUserScore + 10});
        }
    } else {
      this.setState({bgColor: "crimson"})
      this.setState({currentScore: this.state.currentScore - 10})
      this.setState({comboCheck: 0})
      firebase.database().ref().child('/users/' + this.props.passUserId).update({ score: this.props.passUserScore - 10});
      this.handlePlay();
      console.log("WRONG");
   }

   this.resetAndIncreaseIndex();

 }

 resetAndIncreaseIndex(){
   setTimeout(() => {
           this.setState({
           currentIndex: this.state.currentIndex + 1,
           bgColor: "#2773bd",
           seconds: 30,
           time: this.secondsToTime(this.state.seconds)
         })
         this.timer = setInterval(this.countDown, 1000);
         this.startTimer();
       }, 2000);
 }

 secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
      this.setState({bgColor: "red"})
      this.setState({currentScore: this.state.currentScore - 10})
      firebase.database().ref().child('/users/' + this.props.passUserId).update({ score: this.props.passUserScore - 10});
      console.log("WRONG");
      this.resetAndIncreaseIndex();
    }else if (this.state.currentIndex === this.state.numberOfQuestions) {
      clearInterval(this.timer);
    }
  }

  handlePlay() {
    if(this.state.play)
    this.errorSound.play()
  }

  handleOnOff() {
    this.setState({ play: !this.state.play });
  }

  render(){
    return(
      <div className="containerQuiz">
      {this.state.choosen?
      <CategorieOption
      optionJs={this.chooseJs}
      optionMath={this.chooseCss}
      optionHtml={this.chooseHtml} />
      :
      (this.state.currentIndex === this.state.numberOfQuestions? <div className="quizDone"><h1>DONE!</h1><br/><p>Score: {this.state.currentScore}</p></div> :
      <div className="quizHolder" style={{backgroundColor: this.state.bgColor}}>
          <div className="containerHead">
            <p>Time: {this.state.time.s}</p>
            <h1>Quiz</h1>
      
            <p>Score: {this.state.currentScore}</p>
          </div>
          <Question>
          <button className="muteBtn" onClick={this.handleOnOff}>{this.state.play ? 'Mute Off' : 'Mute On'}</button>
            {this.state.question.length > 0? <p className="questionText">{this.state.question[this.state.currentIndex].question.statement}</p> : null}
          </Question>
          <div className="containerAnswers">
            <Alternative check={this.answerCheckOne}>
              {this.state.question.length > 0? <p>{this.state.question[this.state.currentIndex].alternativeOne.statement}</p> : null}
            </Alternative>
            <Alternative check={this.answerCheckOne}>
              {this.state.question.length > 0? <p>{this.state.question[this.state.currentIndex].alternativeTwo.statement}</p> : null}
            </Alternative>
            <Alternative check={this.answerCheckOne}>
              {this.state.question.length > 0? <p>{this.state.question[this.state.currentIndex].alternativeThree.statement}</p> : null}
            </Alternative>
            <Alternative check={this.answerCheckOne}>
              {this.state.question.length > 0? <p>{this.state.question[this.state.currentIndex].alternativeFour.statement}</p> : null}
            </Alternative>
          </div>
        </div>
      )

      }
      </div>
    )
  }
}

function Alternative(props){
  return(
    <div onClick={props.check} className="containerAlternative">
      {props.children}
    </div>
  )
}


function Question(props){
  return(
    <div className="containerQuestion">
      {props.children}
    </div>
  )
}

function CategorieOption(props){
  return(
    <div className="containerButtonOption">
      <button onClick={props.optionJs}>JavaScript</button>
      <button onClick={props.optionMath}>CSS</button>
      <button onClick={props.optionHtml}>HTML</button>
    </div>
  )
}


export default Quiz;
