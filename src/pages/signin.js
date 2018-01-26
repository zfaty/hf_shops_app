import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import SignInForm from '../components/forms/signin_form';

class SignIn extends Component {

  render() {
    const props = this.props;
    return (
      <div style={{width: '50%',margin:'auto'}}>
       <SignInForm submitLabel={"OK"} {...props}/>
        <p>Create an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    )
  }
}

SignIn.propTypes = {
  history: PropTypes.object.isRequired
}
export default SignIn
