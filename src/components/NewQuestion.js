import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleCreateQuestion } from '../actions/shared'
import { Redirect } from 'react-router-dom'

class CreateQuestionsView extends Component {
    state = {
        toHome: false,
      }
    create = (e) => {
        let optionOneText = document.getElementsByName("optionOne")[0].value.trim();
        let optionTwoText = document.getElementsByName("optionTwo")[0].value.trim();
        if (optionOneText.length > 0 && optionTwoText.length > 0) {
            let question = { optionOneText, optionTwoText, author: this.props.currentUser.id }
            this.props.dispatch(handleCreateQuestion(question))
            this.setState( () => (
                {
                    toHome:true
                }
            ))
        } else {
            alert("Enter text for both")
        }
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        if (this.state.toHome) {
            return <Redirect to='/' />
        }
        return (
            <div className='question-panel'>
                <h3>Create New Question</h3>
                <h4>Would you rather?</h4>
                <div><input type="text" name="optionOne"></input></div>
                <h4>OR</h4>
                <div><input type="text" name="optionTwo"></input></div>
                <button onClick={this.create}>Create</button>
                
            </div>
        )
    }
}

function mapStateToProps ( {auth, questions}, props) {
    return {
        currentUser: auth.users[auth.currentUser],
    }
}


export default connect(mapStateToProps)(CreateQuestionsView)