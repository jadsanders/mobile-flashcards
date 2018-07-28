import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform
} from 'react-native';
import { primary, white, primaryMedium, greyDark, greyMedium, secondary, aero, bluePurple } from './utils/colors'
import { Ionicons } from '@expo/vector-icons'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk';

import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import NewDeckView from './components/NewDeckView';
import AddCardView from './components/AddCardView';
import QuizView from './components/QuizView';
import CustomStatusBar from './components/CustomStatusBar';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import { composeWithDevTools } from 'remote-redux-devtools';

import { setLocalNotification } from './utils/helpers'


const Tabs = createBottomTabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-albums' size={30} color={tintColor} />
    },

  },
  NewDeckView: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={tintColor} />
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: white,
    inactiveTintColor: bluePurple,
    style: {
      height: 56,
      backgroundColor: aero,
      padding: 3
    },
    labelStyle: {
      fontSize: 12
    },
    showLabel: true,
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: aero,
      },
      headerTitle: 'Decks'
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: aero,
      },
      headerTitle: 'Deck',
    }
  },
  AddCardView: {
    screen: AddCardView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: aero,
      },
      headerTitle: 'Add Card'
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: aero,
      },
      headerTitle: 'Quiz'
    }
  },
})


const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));

//const store = createStore(reducer);

class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={aero} barStyle='light-content' />
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    currentDeck: state.currentDeck
  }
}

export default App
