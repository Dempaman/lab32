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
      bgColor: "white",
      currentScore: 0,
      comboCheck: 0
    }
    this.answerCheckOne = this.answerCheckOne.bind(this);
    this.addQuestionToState = this.addQuestionToState.bind(this);
    this.chooseJs = this.chooseJs.bind(this);
    this.chooseCss = this.chooseCss.bind(this);
    this.chooseHtml = this.chooseHtml.bind(this);


  }



  chooseJs(){
    this.setState({
    categorie: 'javascript',
    choosen: false
    }, () => {
    this.addQuestionToState();
    });
  }

  chooseCss(){
    this.setState({
    categorie: 'css',
    choosen: false
    }, () => {
    this.addQuestionToState();
    });
  }

  chooseHtml(){
    this.setState({
    categorie: 'html',
    choosen: false
    }, () => {
    this.addQuestionToState();
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

    componentWillMount() {
    this.addQuestionToState();
    }

  answerCheckOne(e, score){


    let answer = e.target.textContent.toString()/*parseInt(e.target.textContent);*/
    let correctAnswer = this.state.question[this.state.currentIndex].question.correct.toString() //parseInt(this.state.question[0].question.correct);

    if ( answer === correctAnswer ) {
      console.log("CORRECT");
      this.setState({comboCheck: this.state.comboCheck + 1})
      this.setState({bgColor: "green"})
        if(this.state.comboCheck >= 3){ // IF COMBO THEN USER GETS 15 POINTS
          this.setState({currentScore: this.state.currentScore + 15})
          firebase.database().ref().child('/users/' + this.props.passUserId).update({ score: this.props.passUserScore + 15});
        }else{
          this.setState({currentScore: this.state.currentScore + 10})
          firebase.database().ref().child('/users/' + this.props.passUserId).update({ score: this.props.passUserScore + 10});
        }
    } else {
      this.setState({bgColor: "red"})
      this.setState({currentScore: this.state.currentScore - 10})
      this.setState({comboCheck: 0})
      firebase.database().ref().child('/users/' + this.props.passUserId).update({ score: this.props.passUserScore - 10});
      console.log("WRONG");
   }


   setTimeout(() => {
           this.setState({
           currentIndex: this.state.currentIndex + 1,
           bgColor: "white"
         })
       }, 2000);
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
      (this.state.currentIndex === this.state.numberOfQuestions? <h1>DONE!<br/><p>Score: {this.state.currentScore}</p></h1> :
      <div className="quizHolder" style={{backgroundColor: this.state.bgColor}}>
          <h1>Quiz</h1>
          <p>{this.state.currentScore}</p>
          <Question>
            {this.state.question.length > 0? <h3>{this.state.question[this.state.currentIndex].question.statement}</h3> : null}
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
