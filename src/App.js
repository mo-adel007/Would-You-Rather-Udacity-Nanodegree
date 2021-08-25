import React from 'react';
import './App.css';
import LoginView from './components/Login'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import HomeView from './components/Home';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div className="App">
        {
          this.props.authenticated ? <HomeView/>: <LoginView/>
        }
      </div>
    )
    }
}

function mapStateToProps({auth}) {
  return {
    authenticated: auth.currentUser ? true : false
  }
}

export default connect(mapStateToProps)(App)
