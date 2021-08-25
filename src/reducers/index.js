import { combineReducers } from 'redux'
import auth from '../reducers/auth'
import questions from '../reducers/questions'

export default combineReducers( {
    auth,
    questions
})