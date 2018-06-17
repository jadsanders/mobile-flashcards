import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { greyLight, primary, primaryMedium, secondary } from '../utils/colors'

class DeckView extends Component {

  render() {
    const { title, questions } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.questions}>
          {questions}
          {questions === 1
            ? ' question'
            : ' questions'
          }
        </Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.button, styles.addBtn]}>
            <Text style={[styles.buttonText, {color: secondary}]}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.startBtn]}>
            <Text style={[styles.buttonText, {color: '#fff'}]}>Start Quiz</Text>
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
  btnContainer: {
    marginTop: 60,
  }
})

export default DeckView
