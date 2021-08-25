import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

class QuestionsView extends Component {

    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <div className='question-panel'>
                <h3>Asked by {this.props.questionAuthorUser.name}</h3>
                <div style={{display:'flex'}}>
                    <img alt={"Avatar of " + this.props.questionAuthorUser.name} className="avatar" src={"../../"+this.props.questionAuthorUser.avatarURL} />
                    <div style={{width:'100%', textAlign:"center"}}>{this.props.question.optionOne.text}</div>
                </div>
                <Link  to={"/question/"+this.props.questionId}>View Poll</Link>
            </div>
        )
    }
}

function mapStateToProps ( {auth, questions}, props) {
    return {
        question: questions[props.questionId],
        questionAuthorUser: auth.users[questions[props.questionId].author]
    }
}


export default connect(mapStateToProps)(QuestionsView)