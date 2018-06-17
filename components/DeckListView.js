import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import getData from '../utils/dummy_data';
import DeckListItem from './DeckListItem';

import { white, greyMedium } from '../utils/colors';


class DeckListView extends Component {

  state = {
    decks: getData()
  }

  render() {

    const { decks } = this.state

    const data = Object.keys(decks).map((key) => {
      return {
        title: decks[key].title,
        questions: decks[key].questions.length
      }
    })

    return (
      <View style={styles.deckListContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.title}
          renderItem={({item}) =>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('DeckView', { title: item.title, questions: item.questions })}
            >
              <Text>{item.title}</Text>
              <Text>{item.questions}</Text>
            </TouchableOpacity>
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
    backgroundColor: white
  }
})

export default DeckListView
