import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <div className="wrap">
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#375739" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,112C640,139,800,213,960,202.7C1120,
          192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        <Header style={{ color: 'white', padding: '100px' }} as="h2" textAlign="center">
          <p>You are signed out.</p>
        </Header>
      </div>
    );
  }
}
