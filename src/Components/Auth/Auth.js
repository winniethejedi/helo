import React, { Component } from 'react';
import './Auth.css';
import helo_logo from '../Assets/helo_logo.png';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../../Redux/actions';

class Auth extends Component {
  constructor(props){
    super(props)
    this.state = {
        username: '',
        password: ''
    }
    this.handleChange = this.handleChange.bind(this);
}

handleChange(e){
  this.setState({
      [e.target.name]: e.target.value,
  });
}

createUserOrLogin(e, login){
  axios.post(`/api/auth/${login}`, {username:this.state.username, password:this.state.password})
      .then((response)=>{
          if(response.data.success){
              this.props.history.push('/dashboard');
          }
          else{
              alert("Your username or password is incorrect")
          }
      })
      .catch((err)=>{
          console.log(err)
      }) 
}

  render() {
    return (
      <div className='splash-screen'>
        <img src={helo_logo} alt='Helo Logo'/>
        <h1>Helo</h1>
        <div className='username-password-input-box'>
          <p>Username:</p>
          <input type='text' placeholder='Username' value = {this.state.username} onChange={this.handleChange} name='username'/>
        </div>
        <div className='username-password-input-box'>
          <p>Password:</p>
          <input type='password' placeholder='Password' value = {this.state.password} onChange={this.handleChange} name='password'/>
        </div>
        <div onClick={(event)=>{this.createUserOrLogin(event, 'login')}} className='black-button'><button>Login</button></div>
        <div onClick={(event)=>{this.createUserOrLogin(event, 'register')}} className='black-button'><button>Register</button></div>
      </div>
    );
  }
}


// add profilePic to sent object
export default connect(null, login(this.state, ...{profilePic: `https://robohash.org/${this.state.username}.png`}))(Auth)