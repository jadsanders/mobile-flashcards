import * as APIUtil from '../utils/api';

export const SELECT_DECK = 'SELECT_DECK'
export const START_QUIZ = 'START_QUIZ'
export const INCREMENT_QUESTION = 'INCREMENT_QUESTION'
export const FETCH_DECKS = 'FETCH_DECKS'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const SAVE_CARD = 'SAVE_CARD'

//get all decks
export const fetchDecks = (decks) => ({
  type: FETCH_DECKS,
  decks
})

//save a deck title with an empty questions array
export const saveDeckTitle = (title) => ({
  type: SAVE_DECK_TITLE,
  title
})

export const addDeckTitle = (title) => dispatch => (
  APIUtil.saveDeckTitle(title)
  .then(dispatch(saveDeckTitle(title)))
  //.then(console.log(title))
)


//save a card with a question & answer to a deck
export const saveCard = (card) => ({
  type: SAVE_CARD,
  card
})

export const addCard = (card) => dispatch => (
  APIUtil.addCardToDeck(card)
  .then(dispatch(saveCard(card)))
)

//select a deck
export const selectDeck = deck => ({
  type: SELECT_DECK,
  deck
})

//start the quiz
export const startQuiz = () => ({
  type: START_QUIZ
})

//increment current quiz question
export const incrementQuestion = values => ({
  type: INCREMENT_QUESTION,
  values
})
