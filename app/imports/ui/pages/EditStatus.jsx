import React from 'react';
import { Grid, Loader, Header, Segment, Table } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Statuses } from '../../api/status/Status';

const bridge = new SimpleSchema2Bridge(Statuses.schema);

/** Renders the Page for editing a single document. */
class EditStatus extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { status, _id } = data;
    Statuses.collection.update(_id, { $set: { status } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <div class="wrap">
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#375739" fill-opacity="1" d="M0,128L80,117.3C160,107,320,85,480,112C640,139,800,213,960,202.7C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" style={{color: "white", padding: "50px 0 0 0"}} textAlign="center">Edit Status</Header>
          <Header as="h4" style={{color: "white" }} textAlign="center">From {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.doc.createdAt) }
          , at {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.props.doc.createdAt)}</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <SelectField name='status'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}

// Require the presence of a Status document in the props object. Uniforms adds 'model' to the props, which we use.
EditStatus.propTypes = {
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
  return {
    doc,
    ready,
  };
})(EditStatus);
