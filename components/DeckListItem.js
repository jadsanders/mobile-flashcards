import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { primaryMedium, greyLight } from '../utils/colors'

class DeckListItem extends Component {

  render() {
    const { title, questions } = this.props
    return(
      <View style={styles.deckListItemContainer}>
        <TouchableOpacity
          style={styles.card}

        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.questions}>
            {questions}
            {questions === 1
              ? ' question'
              : ' questions'
            }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

styles = StyleSheet.create({
  deckListItemContainer: {
    borderBottomWidth: 1,
    borderColor: primaryMedium,
  },
  card: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  questions: {
    fontSize: 18,
    marginTop: 5,
    color: greyLight
  },
})


export default DeckListItem
