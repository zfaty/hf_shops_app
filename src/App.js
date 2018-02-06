import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Home from './pages/home';
import Preferred from './pages/preferred_shop';
import 'font-awesome/css/font-awesome.min.css';
import './styles/bootstrap.css';
import './styles/main.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        props => {
          return localStorage.getItem('user_token') ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      }
    />
  )
}


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <PrivateRoute path="/preferred" component={Preferred}/>
          <PrivateRoute path="/nearby" component={Home}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/signin" component={SignIn}/>
          <Route
             path="/logout"
             component={() => {
               localStorage.setItem('user_token', '')
               return <Redirect to="/signin" />
             }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
