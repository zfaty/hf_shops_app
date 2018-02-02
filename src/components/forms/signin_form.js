import React, { Component } from 'react';
import { sendRequest } from '../../lib/functions';

class SignInForm extends Component {

  constructor(props) {
    super(props);
    this.state = {errors: [],email: '',password:''};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    localStorage.setItem('user_token', '')
  }

  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("ttttt1");
    const form_data = {
      email: this.state.email,
      password: this.state.password
    }
   this.setState({ errors: [] }, () => this.signin(form_data))
  }

  signin(form_data) {
    console.error('sendRequest', form_data);
    sendRequest(
      '/api/signin',
      {
        method: 'post',
        body: JSON.stringify(form_data),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      false
    )
    .then(result => result.json())
    .then(response => {
      console.log("Tokkkken 1",response);
      if (response.success) {
        console.log("Tokkkken 2",response);
        const token = response.data.value
        localStorage.setItem('user_token', token)
        this.props.history.push('/')
      } else {
        const { errors = [] } = response
        this.setState(state => {
        state.errors = errors.length ? errors : ['failed to signin']
          return state
        })
      }
    })
    .catch(err => console.error('signin failed', err))
  }

  render() {
    const { errors } = this.state
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
      {!!errors.length &&
                  errors.map((error, i) => <div className="alert alert-danger" key={i}>{error}</div>)}
      <div className="form-group">
        <label className="cols-sm-2 control-label">Your Email</label>
        <div className="cols-sm-10">
           <div className="input-group">
             <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
             <input type="email" className="form-control" name="email" id="email"  placeholder="Enter your Email"
                   value={this.state.email} onChange={this.handleInputChange} required />
           </div>
         </div>
       </div>
       <div className="form-group">
       <label className="cols-sm-2 control-label">Password</label>
         <div className="cols-sm-10">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
              <input type="password" className="form-control" name="password" placeholder="Enter your Password"
                    value={this.state.password} onChange={this.handleInputChange} required />
            </div>
          </div>
        </div>
       <input className="btn btn-primary btn-lg btn-block login-button" type="submit" value="SignIn" />
     </form>
    );
  }
}

export default SignInForm
