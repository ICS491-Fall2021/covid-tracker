import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Statuses } from '../../api/status/Status';
import StatusItemAdmin from '../components/StatusItemAdmin';

/** Renders a table containing all of the Status documents. Use <StatusItem> to render each row. */
class ListStatusAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Status (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Condition</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.Statuses.map((Status) => <StatusItemAdmin key={Status._id} Status={Status} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Status documents in the props.
ListStatusAdmin.propTypes = {
  Statuses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Status documents.
  const subscription = Meteor.subscribe(Statuses.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Status documents
  const Statuses = Statuses.collection.find({}).fetch();
  return {
    Statuses,
    ready,
  };
})(ListStatusAdmin);
