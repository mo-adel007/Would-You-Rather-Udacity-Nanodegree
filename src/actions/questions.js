export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ANSWER_QUESTION = "ANSWER_QUESTION"
export const ADD_QUESTION = "ADD_QUESTION"
export const SAVE_QUESTION = "SAVE_QUESTION"

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function answerQuestion(id, currentUser, answer) {
    return {
        type: ANSWER_QUESTION,
        id,
        currentUser,
        answer
    }
}



export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}