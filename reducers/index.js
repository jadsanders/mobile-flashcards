import {
  FETCH_DECKS,
  START_QUIZ,
  SELECT_DECK,
  INCREMENT_QUESTION,
  SAVE_DECK_TITLE,
  SAVE_CARD
} from '../actions'

initialState = {
  decks: {},
  currentDeck: {},
  currentQuestions: {},
  totalQuestions: '',
  currentQuizQuestion: '',
  currentCorrectQuizQuestions: '',
}

function quiz (state = initialState, action) {

  const { decks, deck, values, title, card } = action

  switch (action.type) {
    case FETCH_DECKS:
    //console.log(decks)
      return {
        ...state,
        decks: decks
      }

    case SAVE_DECK_TITLE:
      return {
        ...state,
        decks: {
          ...state.decks,
          [title.title]: title
        }
      }

    case SAVE_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
            [card.deck]: {
              ...state.decks[card.deck],
                questions: [...state.decks[card.deck].questions, card.data]
            }
        },
        currentQuestions: [...state.currentQuestions, card.data],
        totalQuestions: state.totalQuestions + 1
      }

    case SELECT_DECK:
      return {
        ...state,
        currentDeck: deck.title,
        currentQuestions: deck.questions,
        totalQuestions: deck.questions.length
      }

    case START_QUIZ:
      return {
        ...state,
        currentQuizQuestion: 0,
        currentCorrectQuizQuestions: 0,
      }

    case INCREMENT_QUESTION:
      return {
        ...state,
        currentQuizQuestion: state.currentQuizQuestion + values.current,
        currentCorrectQuizQuestions: state.currentCorrectQuizQuestions + values.correct,
      }

    default:
      return state
  }
}

export default quiz
