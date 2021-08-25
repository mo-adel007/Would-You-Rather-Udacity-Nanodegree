import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class QuestionsAnswerView extends Component {

    voteLabel = (index) => {
        const optionOneVotes = this.props.question.optionOne.votes.length
        const optionTwoVotes = this.props.question.optionTwo.votes.length
        const totalVotes =  optionOneVotes + optionTwoVotes;
        if (index === 1) {
            return optionOneVotes + " of " + totalVotes + " votes " + (optionOneVotes/totalVotes * 100.0).toFixed(2) + "%"
        } else {
            return optionTwoVotes + " of " + totalVotes + " votes " + (optionTwoVotes/totalVotes * 100.0 ).toFixed(2) + "%"
        }
    }

    yourVoteLabel = (index) => {
        if ( (index === 1 && this.props.question.optionOne.votes.indexOf(this.props.currentUser.id) > -1) || 
             (index === 2 && this.props.question.optionTwo.votes.indexOf(this.props.currentUser.id) > -1)
        )  {
            return <div>Your Vote</div>
        }
    }

    vote = (e) => {
        let option1 = document.getElementById("optionOne").checked;
        let option2 = document.getElementById("optionTwo").checked;

        if (option1) {
            this.props.dispatch(handleAnswerQuestion(this.props.match.params.questionId,this.props.currentUser.id,"optionOne"))
        } else if (option2) {
            this.props.dispatch(handleAnswerQuestion(this.props.match.params.questionId,this.props.currentUser.id,"optionTwo"))
        } else {
            alert("Select one option");
        }
        return;
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        if (this.props.questionExists === false) {
            return <Redirect to="/notFound" />
        }
        return (
            <div className='question-panel'>
                <h3>Asked by {this.props.questionAuthorUser.name}</h3>
                <img alt={"Avatar of " + this.props.questionAuthorUser.name} className="avatar" src={"../"+this.props.questionAuthorUser.avatarURL} />
                {
                    this.props.hasUserAnsweredQuestion ? (
                    <div>
                        <div>
                            <div>{this.props.question.optionOne.text}</div>
                            <div>{this.voteLabel(1)}</div>
                            {this.yourVoteLabel(1)}
                        </div>
                        <div>
                            <div>{this.props.question.optionTwo.text}</div>
                            <div>{this.voteLabel(2)}</div>
                            {this.yourVoteLabel(2)}
                        </div>
                    </div>
                )
                    :
                (
                <div>
                    <h3>Would you rather?</h3>
                    <div>
                        <input type="radio" name="question" value="1" id="optionOne"/>{this.props.question.optionOne.text}?
                    </div>
                    <div>
                        <input type="radio" name="question" value="2" id="optionTwo"/>{this.props.question.optionTwo.text}?
                    </div>
                    <div>
                        <button onClick={this.vote}>Vote</button>
                    </div>
                </div>
                ) 
                }
            </div>
        )
    }
}

function mapStateToProps ( {auth, questions}, props) {
    let currentUser = auth.users[auth.currentUser];
    let question = questions[props.match.params.questionId];
    let questionExists = true;
    if (!question) {
        questionExists = false;
    } 
    let hasUserAnsweredQuestion = false;
    let questionAuthorUser = null; 
    if (questionExists) {
        if (question.optionOne.votes.indexOf(currentUser.id) === -1 &&
            question.optionTwo.votes.indexOf(currentUser.id) === -1) {
               hasUserAnsweredQuestion = false;
       } else {
               hasUserAnsweredQuestion = true;
       }
       questionAuthorUser = auth.users[questions[props.match.params.questionId].author];
    }
   
    return {
        currentUser,
        question,
        questionAuthorUser,
        hasUserAnsweredQuestion,
        questionExists
    }
}


export default withRouter(connect(mapStateToProps)(QuestionsAnswerView))