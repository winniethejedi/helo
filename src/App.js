import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import Post from './Components/Post/Post';
import Form from './Components/Form/Form';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path={`/dashboard`} component={Dashboard}/>
            <Route path={`/post/:postid`} component={Post}/>
            <Route path={`/new`} component={Form}/>
            <Route path={`/`} component={Auth}/>
          </Switch>
        </Router>
    );
  }
}

export default App;