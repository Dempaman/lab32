import React from 'react';
import './Quiz.css';
import firebase from './firebase.js';


class Quiz extends React.Component{
  constructor(){
    super();

    this.state={
      categorie: 'math',
      choosen: true,
      question: [],
      numberOfQuestions: 2,
      currentIndex: 0
    }
    this.answerCheckOne = this.answerCheckOne.bind(this);
    this.addQuestionToState = this.addQuestionToState.bind(this);
    this.chooseJs = this.chooseJs.bind(this);
    this.chooseMath = this.chooseMath.bind(this);
  }

  chooseJs(){
    this.setState({
    categorie: 'javascript',
    choosen: false
    }, () => {
    this.addQuestionToState();
    });
  }

  chooseMath(){
    this.setState({
    categorie: 'math',
    choosen: false
    }, () => {
    this.addQuestionToState();
    });
  }

  addQuestionToState(){
    firebase.database().ref('categories/' + this.state.categorie).once('value').then(function(snapshot) {
      let questionList = [];
      console.log(snapshot.val())
      snapshot.forEach(function(child) {
        questionList.push(child.val());
      });

      this.setState({question: questionList});
      }.bind(this));

  }

    componentWillMount() {
    this.addQuestionToState();
    }


  answerCheckOne(e){
    console.log(e.target.textContent);

    let answer = e.target.textContent.toString()/*parseInt(e.target.textContent);*/
    let correctAnswer = this.state.question[0].question.correct.toString() //parseInt(this.state.question[0].question.correct);

    if ( answer === correctAnswer ) {
      console.log("CORRECT");
    } else {
      console.log("WRONG");
   }

this.setState( {currentIndex: this.state.currentIndex + 1} )
   if(this.state.question.length - 1 > this.state.currentIndex){
     console.log("one more")
   }else{
     console.log("no more")
   }
   console.log(correctAnswer);
   console.log(answer);
 }


  render(){
    return(
      <div className="containerQuiz">
      {this.state.choosen?
      <CategorieOption
      optionJs={this.chooseJs}
      optionMath={this.chooseMath} />
      :
      (this.state.currentIndex === this.state.numberOfQuestions? <h1>DONE!</h1> :
      <div className="quizHolder">
          <h1>Quiz</h1>
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
    <div>
      <button onClick={props.optionJs}>Javascript</button>
      <button onClick={props.optionMath}>Math</button>
    </div>
  )
}


export default Quiz;
