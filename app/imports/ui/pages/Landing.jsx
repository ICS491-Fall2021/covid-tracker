import React from 'react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="wrap">
        <div className="content">
          <h1> Covid Tracker </h1>
          <p> Sign in to track your COVID-status for the day, add your vaccine status, and more. </p>
          <div className="btn-group">
            <a className="primary-btn"><Link to ="/signin">Sign in</Link></a>
            <a><Link to ="/signup"> Register</Link></a>
          </div>
        </div>
       </div>
    );
  }
}

export default Landing;
