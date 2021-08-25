import { LOGIN_USER } from '../actions/auth'
import { LOGOUT_USER } from '../actions/auth'
import { GET_USERS } from '../actions/auth'
import { SET_ANSWER_USER }  from '../actions/auth'
import { SET_QUESTION_USER }  from '../actions/auth'

export default function authenticatedUsers(state={}, action) {
    let newState = null;
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                currentUser:action.id
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: null
            }
        case GET_USERS:
                return  {
                    ...state,
                    users:action.users
                }
        case SET_ANSWER_USER:
                newState = Object.assign({}, state);
                newState.users[action.uid].answers[action.qid]=action.answer;
                return newState;
        case SET_QUESTION_USER:
                newState = Object.assign({}, state);
                newState.users[action.uid].questions = newState.users[action.uid].questions.concat(action.qid);
                return newState;
        default:
            return state
    }
}