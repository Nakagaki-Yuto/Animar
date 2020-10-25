import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from '../src/components/Home'
import Login from '../src/components/Login'
import SignUp from '../src/components/SignUp'
import viewProfile from '../src/components/ViewProfile'
import NotFound from '../src/components/NotFound'
import Post from '../src/components/Post'
import Error from '../src/components/Error'
import ForHidden from '../src/components/ForHidden'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/main" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/viewProfile" component={viewProfile} />
          <Route exact path="/Post" component={Post} />
          <Route path='/error' component={Error} />
          <Route path='/forhidden' component={ForHidden} />
          <Route><NotFound /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
