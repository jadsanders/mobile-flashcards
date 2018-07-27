import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux'

import { white, greyMedium, secondary, aero, moonstone, indigo, powder, alice } from '../utils/colors';

import { selectDeck, fetchDecks } from '../actions'

import { getDecks } from '../utils/api'


class DeckListView extends Component {

  selectDeck(item) {
    this.props.navigation.navigate('DeckView')
    this.props.selectDeck(item)
  }

  componentDidMount() {
    const { fetchDecks } = this.props
    getDecks()
    .then((results) => fetchDecks(results))
  }


  render() {

    const { decks } = this.props

    return (
      <View style={styles.deckListContainer}>
        <FlatList
          data={decks}
          keyExtractor={(item, index) => item.title}
          renderItem={({item, index}) =>

            <View style={styles.touchContainer}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => this.selectDeck(item)}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.questions}>
                  {item.questions.length}
                  {item.questions.length === 1
                    ? ' question'
                    : ' questions'
                  }
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckListContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  touchContainer: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    //backgroundColor: 'red',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: moonstone
  },
  title: {
    fontSize: 24,
    color: white,
  },
  questions: {
    fontSize: 18,
    marginTop: 7,
    color: powder
  }
})

function mapStateToProps(state) {
  return {
    decks: Object.keys(state.decks).map((key) => {
      return {
        title: state.decks[key].title,
        questions: state.decks[key].questions
      }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDecks: (decks) => dispatch(fetchDecks(decks)),
    selectDeck: (deck) => dispatch(selectDeck(deck))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeckListView)
