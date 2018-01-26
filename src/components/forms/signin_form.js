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
      '/api/login.json',
      {
        method: 'get',
        headers: {
          'content-type': 'application/json'
        }
      },
      false
    )
    .then(result => result.json())
    .then(response => {
      if (response.success) {
        const token = response.data.token
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
      <form onSubmit={this.handleSubmit} className="App-intro">
        {!!errors.length &&
              errors.map((error, i) => <span key={i}>{error}</span>)}

        <label style={{display: 'block'}}>
          Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
        </label>
        <label style={{display: 'block'}}>
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <input style={{display: 'block'}} type="submit" value={this.props.submitLabel} />
      </form>
    );
  }
}

export default SignInForm
