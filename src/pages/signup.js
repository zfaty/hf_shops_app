import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import SignUpForm from '../components/forms/signup_form';

class SignUp extends Component {

  render() {
    const props = this.props;
    return (
      <div className="row main">
        <div className="panel-heading">
           <div className="panel-title text-center">
           		<h1 className="title">SHOPS</h1>
           		<hr />
           	</div>
        </div>
        <div className="main-login main-center">
         <SignUpForm submitLabel={"OK ok"} {...props}/>
          <p>Already have a account ? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  history: PropTypes.object.isRequired
}

export default SignUp
