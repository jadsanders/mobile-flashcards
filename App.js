import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform
} from 'react-native';
import { primary, white, primaryMedium, greyDark, greyMedium } from './utils/colors'
import { Ionicons } from '@expo/vector-icons'

import DeckListView from './components/DeckListView';
import DeckView from './components/DeckView';
import NewDeckView from './components/NewDeckView';

import CustomStatusBar from './components/CustomStatusBar';

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'



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
      tabBarLabel: 'New',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={30} color={tintColor} />
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: white,
    inactiveTintColor: greyMedium,
    style: {
      height: 56,
      backgroundColor: greyDark,
      padding: 3
    },
    labelStyle: {
      fontSize: 12
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: greyDark,
      },
      headerTitle: 'Home'
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: greyDark,
      }
    }
  }
})

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomStatusBar backgroundColor={greyDark} barStyle='light-content' />
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
