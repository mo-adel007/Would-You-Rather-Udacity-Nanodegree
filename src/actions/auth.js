export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const GET_USERS = "GET_USERS"
export const SET_ANSWER_USER = "SET_ANSWER_USER"
export const SET_QUESTION_USER = "SET_QUESTION_USER"

export function loginUser(id) {
    return {
        type: LOGIN_USER,
        id
    }
}

export function getUsers(users) {
    return {
        type: GET_USERS,
        users
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}

export function setAnswerOnUser(uid, qid, answer) {
    return {
        type: SET_ANSWER_USER,
        uid,
        qid,
        answer
    }
}

export function setQuestionOnUser(uid, qid) {
    return {
        type: SET_QUESTION_USER,
        uid,
        qid
    }
}