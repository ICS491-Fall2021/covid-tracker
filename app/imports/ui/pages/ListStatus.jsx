import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Statuses } from '../../api/status/Status';
import { Patients } from '../../api/patients/Patients';
import StatusItem from '../components/StatusItem';
import VaccinationItem from '../components/VaccinationItem';

/** Renders a table containing all of the Status documents. Use <StatusItem> to render each row. */
class ListStatus extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready && this.props.patientsReady) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="wrap">
        <Container>
          <Header style={{ color: 'white', padding: '100px 0px 50px' }} as="h2" textAlign="center">
            Your Vaccination Record</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Added</Table.HeaderCell>
                <Table.HeaderCell>Vaccination Type</Table.HeaderCell>
                <Table.HeaderCell>1st Dose Date</Table.HeaderCell>
                <Table.HeaderCell>2nd Dose Date</Table.HeaderCell>
                <Table.HeaderCell>Upload Vaccine Card</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.patients.map((patient) => <VaccinationItem key={patient._id} patient={patient} />)}
            </Table.Body>
          </Table>
          <Header style={{ color: 'white', padding: '50px' }} as="h2" textAlign="center">
          Your past reported statuses</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Time (HST)</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.statuses.map((status) => <StatusItem key={status._id} status={status} />)}
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

// Require an array of Status documents in the props.
ListStatus.propTypes = {
  statuses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  patients: PropTypes.array.isRequired,
  patientsReady: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Status documents.
  const subscription = Meteor.subscribe(Statuses.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Status documents
  const statuses = Statuses.collection.find({}).fetch();
  // Get access to Patients documents.
  const patientSubscription = Meteor.subscribe(Patients.userPublicationName);
  // Determine if the subscription is ready
  const patientsReady = patientSubscription.ready();
  // Get the Status documents
  const patients = Patients.collection.find({}).fetch();

  return {
    statuses,
    ready,
    patients,
    patientsReady,
  };
})(ListStatus);
