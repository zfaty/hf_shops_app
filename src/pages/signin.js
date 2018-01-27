import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import SignInForm from '../components/forms/signin_form';

class SignIn extends Component {

  render() {
    const props = this.props;
    return (
      <div className="row main">
      <div className="main-login main-center">
       <SignInForm submitLabel={"OK"} {...props}/>
        <p>New User ?  <Link to="/signup">Create new account</Link></p>
      </div>
      </div>
    )
  }
}

SignIn.propTypes = {
  history: PropTypes.object.isRequired
}
export default SignIn
