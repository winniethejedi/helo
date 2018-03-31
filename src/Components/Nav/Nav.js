import React, { Component } from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import home_logo from '../Assets/home_logo.png';
import new_logo from '../Assets/new_logo.png';
import shut_down from '../Assets/shut_down.png';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class Nav extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//         username: '',
//         profilePic: ''
//     }
// };
  render() {
    return (
      <div className='nav' >
        <div className='step-image' style={{backgroundImage: `url(${this.props.profilePic})`}} alt='Preview' />
        <p>{this.props.username}</p>
        <Link to='/dashboard'><img src={home_logo} alt='Home'/></Link>
        <Link to='/new'><img src={new_logo} alt='New Post'/></Link>
        <Link to='/'><img src={shut_down} alt='Logout'/></Link>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    username: state.username,
    profilePic: state.profilePic
  }
}

export default connect(mapStateToProps)(Nav);