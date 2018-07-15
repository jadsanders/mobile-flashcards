import { AsyncStorage } from 'react-native'
import { dummyData } from './dummy_data'

export const STORAGE_KEY = 'mobileFlashcards'

const setDummyData = () => {
	AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))
	return dummyData
}

const formatDecks = results => {
	return results === null
		? setDummyData()
    : JSON.parse(results)
}

export function getDecks () {
  //AsyncStorage.clear()
  return AsyncStorage.getItem(STORAGE_KEY)
  .then(formatDecks)
}

export function saveDeckTitle (deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}

export function addCardToDeck (card) {
	return getDecks().then((decks) => {
		const deck = decks[card.deck]
		deck.questions.push(card.data)
		AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
	})
}
