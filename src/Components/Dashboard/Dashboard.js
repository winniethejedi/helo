import React, { Component } from 'react';
import './Dashboard.css';
import Nav from '../Nav/Nav';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default Dashboard;