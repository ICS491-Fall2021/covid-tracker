import React from 'react';
import { Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Statuses } from '../../api/status/Status';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';


const bridge = new SimpleSchema2Bridge(Statuses.schema);
var numDays = 0;

/** Renders the Page for editing a single document. */
class Profile extends React.Component {

    // If the subscription(s) have been received, render the page, otherwise show a loading icon.
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    // Render the form. Use Uniforms: https://github.com/vazco/uniforms
    renderPage() {
        return (
            <div className="wrap">
                <section class="profile">
                    <div>
                        <h1>Help your community by <br/> checking your COVID status</h1>
                        <p class="accent">NUMBER OF TIMES YOU'VE CHECKED IN: {numDays}</p>
                        
                    </div>
                    <div class ="imgbutton">
                        <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>
                            <img src="/images/time1.jpeg" height="200px" width="300px"></img>
                        </Menu.Item>
                        <h3 class ="toptxt">LIST PAST STATUSES</h3>
                    </div>
                    <div class ="imgbutton">
                        <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>
                            <img src="images/family2.jpeg" height="200px" width="300px"></img>
                        </Menu.Item>
                        <h3 class ="toptxt">ADD STATUS FOR TODAY</h3>
                    </div>
                    <h1 class="righttxt">Your Profile</h1>
                </section>
                <svg id="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#375739" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,112C640,139,800,213,960,202.7C1120,192,1280,
          96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>
        );
    }
}

// Require the presence of a Status document in the props object. Uniforms adds 'model' to the props, which we use.
Profile.propTypes = {
    doc: PropTypes.object,
    model: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Status documents.
    const subscription = Meteor.subscribe(Statuses.userPublicationName);
    // Determine if the subscription is ready
    const ready = subscription.ready();
    // Get the document
    const doc = Statuses.collection.findOne(documentId);
    numDays = Statuses.collection.find({documentId}).count();
    console.log(numDays);
    return {
        doc,
        ready,
    };
})(Profile);
