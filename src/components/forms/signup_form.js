import React, { Component } from 'react';
import { sendRequest } from '../../lib/functions';

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {email: '',password:'',confpassword:''};
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
      password: this.state.password,
      confpassword:this.state.confpassword
    }
   this.setState({ errors: [] }, () => this.signup(form_data))
  }

  signup(form_data) {
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
    return (
      <form onSubmit={this.handleSubmit}>
        <label style={{display: 'block'}}>
          Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
        </label>
        <label style={{display: 'block'}}>
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <label style={{display: 'block'}}>
          Confirm Password:
          <input type="text" name="confpassword" value={this.state.confpassword} onChange={this.handleInputChange}/>
        </label>
        <input style={{display: 'block'}} type="submit" value={this.props.submitLabel} />
      </form>
    );
  }
}

export default SignUpForm
