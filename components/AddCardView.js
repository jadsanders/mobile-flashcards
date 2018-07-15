import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'

import { secondary } from '../utils/colors'
import { addCard } from '../actions'

class AddCardView extends Component {

  state = {
    question: '',
    answer: '',
  }

  addCard(data) {
    this.props.addCard(data)
    this.setState({ question: '', answer: '', saveVisible: false })
    this.props.navigation.navigate('DeckView')
  }

  canBeSubmitted() {
    const { question, answer } = this.state
    return (
      question.length > 0 &&
      answer.length > 0
    )
  }

  render() {

    return(
      <View style={styles.container}>
        <Text style={[styles.title, { marginTop: 40 }]}>What is the question?</Text>

        <TextInput
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          value={this.state.text}
          placeholder='e. g. "What color is the sky?"'
          autoFocus={true}
          clearButtonMode='always'
        />

        <Text style={styles.title}>What is the answer?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.text}
          placeholder='e. g. "Blue!"'
          clearButtonMode='always'
        />


        {this.canBeSubmitted() === true &&
          <TouchableOpacity
            style={[styles.button, styles.saveBtn]}
            onPress={() => this.addCard({deck: this.props.currentDeck, data: this.state})}
          >
            <Text style={[styles.buttonText, {color: '#fff'}]}>Save Card</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
  button: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderWidth: 1,
    borderRadius: 7,
    margin: 7,
  },
  saveBtn: {
    borderColor: secondary,
    backgroundColor: secondary,
  },
  input: {
    width: 350,
    borderWidth: 1,
    borderColor: secondary,
    borderRadius: 7,
    padding: 15,
    fontSize: 24,
    marginTop: 5,
    marginBottom: 40,
  }
})

function mapStateToProps(state){
  return {
    currentDeck: state.currentDeck
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: (card) => dispatch(addCard(card))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCardView)
