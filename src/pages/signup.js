import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import SignUpForm from '../components/forms/signup_form';

class SignUp extends Component {

  render() {
    const props = this.props;
    return (
      <div style={{width: '50%',margin:'auto'}}>
       <SignUpForm submitLabel={"OK ok"} {...props}/>
        <p>Already have a account ? <Link to="/signin">Sign In</Link></p>
      </div>
    )
  }
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired
}

export default SignUp
