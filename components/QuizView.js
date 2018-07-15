import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { secondary, white, green, red, greyLight } from '../utils/colors'
import { incrementQuestion, startQuiz } from '../actions'

class QuizView extends Component {

  state = {
    questionVisible: true
  }

  flipCard() {
    this.setState({questionVisible: !this.state.questionVisible})
  }

  renderText() {
    const { questionVisible } = this.state
    const { currentQuestions, currentQuizQuestion } = this.props

    if ( questionVisible === true ) {
      return <Text>{currentQuestions[currentQuizQuestion].question}</Text>
    } else {
      return <Text>{currentQuestions[currentQuizQuestion].answer}</Text>
    }
  }

  renderButton() {
    const { questionVisible } = this.state
    if ( questionVisible === true ) {
      return <Text onPress={() => this.flipCard()}>Show Answer</Text>
    } else {
      return <Text onPress={() => this.flipCard()}>Show Question</Text>
    }
  }

  quizRunning() {
    const { totalQuestions, currentQuizQuestion } = this.props
    if (currentQuizQuestion+1 <= totalQuestions) {
      return true
    } else {
      return false
    }
  }

  answerQuestion(values) {
    this.props.incrementQuestion(values)
    this.setState({questionVisible: true})
  }

  render() {

    const {
      view,
      textContainer,
      buttonsContainer,
      textButton,
      text,
      correctBtn,
      inCorrectBtn,
      button,
      buttonText,
      counterContainer,
      smallHeader,
      scoreValue,
      scoreScreen,
      smallText,
      mediumText,
      restartBtn,
    } = styles

    const {
      totalQuestions,
      currentQuizQuestion,
      currentQuestions,
      score,
      currentDeck,
      correctAnswers,
      restartQuiz,
    } = this.props

    return(
      <View style={view}>

        {this.quizRunning() &&
          <View>
            <View style={counterContainer}>
              <Text>{currentQuizQuestion+1} of {totalQuestions} questions</Text>
            </View>


            <View style={textContainer}>
              <Text style={text}>{this.renderText()}</Text>
              <Text style={textButton}>{this.renderButton()}</Text>
            </View>

            <View style={buttonsContainer}>
              <TouchableOpacity
                style={[button, correctBtn]}
                onPress={() => this.answerQuestion({current: 1, correct: 1})}>
                <Text style={buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[button, inCorrectBtn]}
                onPress={() => this.answerQuestion({current: 1, correct: 0})}>
                <Text style={buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        }

        {this.quizRunning() === false &&

          <View style={scoreScreen}>

            <Text style={mediumText}>
              {score === 100 &&
                "AWESOME!!!"
              }
              {score >= 50 && score<100 &&
                "Good."
              }
              {score <50 &&
                "Hm ... "
              }

            </Text>

            <Text style={smallText}>
              {score === 100 &&
                "You achieved a FULL score of"
              }
              {score >= 50 && score<100 &&
                "You achieved a score of"
              }
              {score <50 &&
                "You can definitely do better. Maybe you should repeat this quiz as you only achieved a score of"
              }
            </Text>

            <Text style={scoreValue}>{score}</Text>

              {score === 100 &&
                <Text style={smallText}>This means you answered all questions correctly.</Text>
              }

              {score<100 &&
                <Text style={smallText}>This means you answered {correctAnswers} out of {totalQuestions} questions correctly.</Text>
              }



              <TouchableOpacity style={[button, restartBtn, {marginTop: 50}]} onPress={() => restartQuiz()}>
                <Text style={buttonText}>Restart Quiz</Text>
              </TouchableOpacity>

          </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  counterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 40,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flex: 3,
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  buttonsContainer: {
    display: 'flex',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: secondary,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    width: 150,
    borderRadius: 7,
    margin: 7,
  },
  correctBtn: {
    backgroundColor: green
  },
  inCorrectBtn: {
    backgroundColor: red
  },
  buttonText: {
    color: white,
    fontSize: 18,
  },
  scoreScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  scoreValue: {
    fontSize: 72,
    backgroundColor: secondary,
    color: white,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    margin: 40,
  },
  mediumText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 18,
    textAlign: 'center',
  },
  restartBtn: {
    backgroundColor: secondary
  }
});

function mapStateToProps(state) {
  return {
    currentQuizQuestion: state.currentQuizQuestion,
    totalQuestions: state.totalQuestions,
    currentQuestions: state.currentQuestions,
    score: Math.round((state.currentCorrectQuizQuestions/state.totalQuestions)*100),
    currentDeck: state.currentDeck,
    correctAnswers: state.currentCorrectQuizQuestions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    incrementQuestion: (values) => dispatch(incrementQuestion(values)),
    restartQuiz: () => dispatch(startQuiz())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizView)
