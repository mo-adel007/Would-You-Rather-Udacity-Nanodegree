import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionView from './Question';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class AllQuestionsView extends Component {


    sortQuestionsByRecentlyCreated = (q1, q2) => {
        const q1Date = q1.timestamp;
        const q2Date = q2.timestamp;

        if (q1Date > q2Date) {
            return -1;
        } else if (q1Date < q2Date) {
            return 1;
        } else {
            return 0;
        }
    }    

    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <div style={{width:'100%'}}>
                <div className='tab'>
                        <Link className='tablinks' to="/home/unanswered">Unanswered</Link>
                        <Link className='tablinks' to="/home/answered">Answered</Link>
                </div>
                <div className="questions-list">
                <Route exact path='/home' render={({ history }) => (
                           <Redirect to='/home/unanswered' />
                           )} />
                <Route path='/home/unanswered' render={({ history }) => (
                             this.props.unansweredQuestions.sort(this.sortQuestionsByRecentlyCreated).map((question) => <QuestionView key={question.id} questionId={question.id} />)
                          )} />
                <Route path='/home/answered' render={({ history }) => (
                             this.props.answeredQuestions.sort(this.sortQuestionsByRecentlyCreated).map((question) => <QuestionView key={question.id} questionId={question.id} />)
                          )} />
                </div>   
            </div>
        )
    }
}

function mapStateToProps ( {auth, questions}) {
    let currentUser = auth.users[auth.currentUser];
    let answeredQuestionsKeys = Object.keys(currentUser.answers);
    let unAnsweredQuestionsKeys = Object.keys(questions).filter(key => answeredQuestionsKeys.indexOf(key) === -1);
    
    return {
        answeredQuestions: answeredQuestionsKeys.map((key)=> questions[key]),
        unansweredQuestions:  unAnsweredQuestionsKeys.map((key)=> questions[key]),
    }
}


export default connect(mapStateToProps)(AllQuestionsView)