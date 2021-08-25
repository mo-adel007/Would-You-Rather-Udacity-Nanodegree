import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'
import AllQuestionsView from './Questions';
import LeaderBoardView from './LeaderBoard';
import CreateQuestionsView from './NewQuestion';

import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import QuestionAnswerView from './QuestionAnswer';
import NotFound from './404';
import { Redirect } from 'react-router-dom'


class HomeView extends Component {
    state = {
        selectedTab: 'Home'
    }
    logout = (e) => {
        this.props.dispatch(logoutUser())
    }


    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <div>
                <h3>Home View</h3>
                <div className='tab'>
                        <Link to='/home/unanswered' className='tablinks' >Home</Link>
                        <Link to='/add' className='tablinks' >New Question</Link>
                        <Link to='/leaderboard' className='tablinks' >Leader Board</Link>
                        <span>Welcome {this.props.users[this.props.currentUser].name}</span>
                        <Link to='/' className='tablinks' onClick={this.logout}>Logout</Link>
                </div>
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column',alignItems:'center'}}>
                    
                         <Route exact path='/' render={({ history }) => (
                            <Redirect to='/home'/>
                          )} />
                          <Route path='/home/' render={({ history }) => (
                            <AllQuestionsView/>
                          )} />
                          <Route path='/add' render={({ history }) => (
                            <CreateQuestionsView />
                          )} />
                        <Route path='/leaderboard' render={({ history }) => (
                            <LeaderBoardView />
                          )} />
                        <Route path='/question/:questionId' render={({ history }) => (
                            <QuestionAnswerView />
                          )} />
                        <Route path='/notfound' render={({ history }) => (
                            <NotFound/>
                          )} />
                </div>
            </div>
        )
    }
}

function mapStateToProps ( {auth}) {
    return {
        users: auth.users ? auth.users : {},
        currentUser: auth.currentUser
    }
}


export default connect(mapStateToProps)(HomeView)