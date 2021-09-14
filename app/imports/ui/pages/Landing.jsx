import React from 'react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div class="wrap">
        <div class="content">
          <h1> Covid Tracker </h1>
           <p> Sign in to track your COVID-status for the day, add your vaccinne status, and more. </p>
        <div class="btn-group">
          <a class="primary-btn"><Link to ="/signin">Sign in</Link></a>
          <a><Link to ="/signup"> Register</Link></a>
        </div>
      </div>
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#375739" fill-opacity="1" d="M0,128L80,117.3C160,107,320,85,480,112C640,139,800,213,960,202.7C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      </div>
    );
  }
}

export default Landing;
