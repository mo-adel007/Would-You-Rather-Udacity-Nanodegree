import { RECEIVE_QUESTIONS } from '../actions/questions'
import { ADD_QUESTION } from '../actions/questions'
import { ANSWER_QUESTION } from '../actions/questions'
import { SAVE_QUESTION } from '../actions/questions'


export default function questions(state={}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case ANSWER_QUESTION:
            let newState = Object.assign({}, state);
            newState[action.id][action.answer].votes = newState[action.id][action.answer].votes.concat(action.currentUser);
            return newState;
        case SAVE_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        default: 
            return state
    }
}