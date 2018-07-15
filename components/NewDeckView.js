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

import { addDeckTitle, selectDeck } from '../actions'

class NewDeckView extends Component {
  state = {
    title: '',
    questions: [],
    createdAt: Date.now()
  }

  addDeck(deck) {
    this.props.addDeckTitle(deck)
    this.props.navigation.navigate('DeckView')
    this.setState({title: ''})
    this.props.selectDeck(deck)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder='e. g. "My awesome deck"'
          autoFocus={true}
          clearButtonMode='always'
        />

        {this.state.title.length > 0 &&
          <TouchableOpacity
            style={[styles.button, styles.saveBtn]}
            onPress={() => this.addDeck(this.state)}
          >
            <Text style={[styles.buttonText, {color: '#fff'}]}>Save Deck</Text>
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
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
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
    marginTop: 40,
    marginBottom: 40,
  }
})

function mapDispatchToProps(dispatch) {
  return {
    addDeckTitle: (deck) => dispatch(addDeckTitle(deck)),
    selectDeck: (deck) => dispatch(selectDeck(deck))
  }
}


export default connect(null,mapDispatchToProps)(NewDeckView)
