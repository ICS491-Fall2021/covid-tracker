import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/*
if (this.props.patient.dose2Date === '1970-01-01T15:30:00.782Z') {
  const theDate = 'N/A';
} else {
  const theDate = 'this.props.patient.dose2Date';
}
 */


/** Renders a single row in the List Status table. See pages/ListStatus.jsx. */
class VaccinationItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.patient.uploaded)}</Table.Cell>
        <Table.Cell>{this.props.patient.vaccineType}</Table.Cell>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.patient.dose1Date)}</Table.Cell>
        {this.props.patient.dose2Date !== '1970-01-01T15:30:00.782Z' &&
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.patient.dose2Date)}</Table.Cell>
        }
        {this.props.patient.dose2Date === '1970-01-01T15:30:00.782Z' &&
        <Table.Cell>N/A</Table.Cell>
        }
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
VaccinationItem.propTypes = {
  patient: PropTypes.shape({
    vaccineType: PropTypes.string,
    uploaded: PropTypes.instanceOf(Date), // WIP
    dose1Date: PropTypes.instanceOf(Date),
    dose2Date: PropTypes.instanceOf(Date),
    // _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VaccinationItem);
