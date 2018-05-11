import React from 'react';
import './Quiz.css';
import firebase, { auth, provider } from './firebase.js';


class Quiz extends React.Component{
  constructor(){
    super();

    this.state={
      question: [],
      currentIndex: 0,
      questionsAnswer: [
        { // 1
          question: 'What is 8 x 1 ?',
          options: [ 2, 7, 8, 9],
          answer: 8
        },
        { // 2
          question: 'What is 3 + 4 ?',
          options: [ 5, 7, 9, 34],
          answer: 7
        },
      ]
    }
    this.answerCheckOne = this.answerCheckOne.bind(this);
    this.addQuestionToState = this.addQuestionToState.bind(this);
  }

  addQuestionToState(){
    firebase.database().ref('categories/javascript').once('value').then(function(snapshot) {
      let questionList = [];
      console.log(snapshot.val())
      snapshot.forEach(function(child) {
        questionList.push(child.val());
      });

      this.setState({question: questionList});
      console.log("QUESTIONS", this.state.question[0].alternativeOne)
      }.bind(this));
  }

    componentDidMount() {
    this.addQuestionToState()
    }


  answerCheckOne(e){
    console.log(e.target.textContent);

    let answer = parseInt(e.target.textContent);
    let correctAnswer = parseInt(this.state.questionsAnswer[this.state.currentIndex]['answer'])

    if ( answer === correctAnswer ) {
      console.log("CORRECT");
    } else {
      console.log("WRONG");
   }

   this.setState( {currentIndex: this.state.currentIndex + 1} )
  }


  render(){
    return(
      <div className="containerQuiz">
        <div className="quizHolder">
          <h1>Quiz</h1>
          <Question>{this.state.questionsAnswer[this.state.currentIndex].question}</Question>
          <div className="containerAnswers">
            <Alternative check={this.answerCheckOne}>
            {this.state.questionsAnswer[this.state.currentIndex].options[0]}
            </Alternative>
            <Alternative check={this.answerCheckOne}>
            {this.state.questionsAnswer[this.state.currentIndex].options[1]}
            </Alternative>
            <Alternative check={this.answerCheckOne}>
            {this.state.questionsAnswer[this.state.currentIndex].options[2]}
            </Alternative>
            <Alternative check={this.answerCheckOne}>
            {this.state.questionsAnswer[this.state.currentIndex].options[3]}
            </Alternative>
          </div>
        </div>
      </div>
    )
  }
}

function Alternative(props){
  return(
    <div onClick={props.check} className="containerAlternative">
      <p>{props.children}</p>
    </div>
  )
}


function Question(props){

  return(
    <div className="containerQuestion">
      <h3>{props.children}</h3>
    </div>
  )
}


export default Quiz;
