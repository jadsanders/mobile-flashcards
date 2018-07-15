import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import AddCardView from './AddCardView'
import { greyLight, primary, primaryMedium, secondary, white, greyDark, whiteDark } from '../utils/colors'

import { connect } from 'react-redux'

import { startQuiz } from '../actions'

class DeckView extends Component {

  startQuiz() {
    this.props.navigation.navigate('QuizView')
    this.props.startQuiz()
  }

  render() {
    const { title, questions } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.questions}>
          {questions.length}
          {questions.length === 1
            ? ' question'
            : ' questions'
          }
        </Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.button, styles.addBtn]}
            onPress={() => this.props.navigation.navigate('AddCardView')}
          >
            <Text style={[styles.buttonText, {color: secondary}]} >Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              questions.length === 0
              ? [styles.button, styles.startBtnDisabled]
              : [styles.button, styles.startBtn]
            }
            onPress={() => this.startQuiz(title)}
            disabled={questions.length === 0 ? true : false}
          >

            {questions.length === 0
              ? <Text style={[styles.buttonText, {color: 'transparent'}]}>Start Quiz</Text>
              : <Text style={[styles.buttonText, {color: '#fff'}]}>Start Quiz</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
  },
  questions: {
    fontSize: 24,
    color: greyLight,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 24,
  },
  button: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 80,
    paddingRight: 80,
    borderWidth: 1,
    borderRadius: 7,
    margin: 7,
  },
  addBtn: {
    borderColor: secondary
  },
  startBtn: {
    borderColor: secondary,
    backgroundColor: secondary,
  },
  startBtnDisabled: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  btnContainer: {
    marginTop: 60,
  }
})

function mapStateToProps (state) {
  return {
    questions: state.currentQuestions,
    title: state.currentDeck
  }
}

function mapDispatchToProps (dispatch) {
  return {
    startQuiz: () => dispatch(startQuiz()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeckView)
