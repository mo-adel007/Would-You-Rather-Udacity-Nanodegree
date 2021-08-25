import { _getUsers } from '../_DATA'
import { _getQuestions } from '../_DATA'
import { getUsers, setAnswerOnUser, setQuestionOnUser } from './auth'
import { receiveQuestions, answerQuestion, saveQuestion } from './questions'
import {_saveQuestionAnswer, _saveQuestion } from '../_DATA'

export function handleInitialData() {
    return (dispatch) => {
         _getUsers()
            .then((users) => {
                dispatch(getUsers(users))
            })
        _getQuestions()
        .then((questions)=> {
            dispatch(receiveQuestions(questions))
        });
        return;
        // return getInitialData()
        //     .then(({users, tweets}) => {
        //         dispatch(receiveUsers(users))
        //         dispatch(receiveTweets(tweets))
        //         dispatch(setAuthedUser(AUTHED_ID))
        //         dispatch(hideLoading())
        //     } )
    }
}

export function handleAnswerQuestion(id, currentUser, answer) {
    return (dispatch) => {
        dispatch(answerQuestion(id, currentUser, answer))
        dispatch(setAnswerOnUser(currentUser, id, answer))

        return  _saveQuestionAnswer({authedUser:currentUser,qid:id, answer}).catch( () => {
            alert('An error occurred');
        });
    }
   
}

export function handleCreateQuestion(question) {
    return (dispatch) => {
        return  _saveQuestion(question)
        .then((question) => {
            dispatch(saveQuestion(question))
            dispatch(setQuestionOnUser(question.author, question.id))
        })
        .catch( (e) => {
            alert('An error occurred ' + e);
        });
    }
   
}