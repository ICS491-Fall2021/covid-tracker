import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Status table. See pages/ListStatus.jsx. */
class VaccinationItem extends React.Component {

  render() {
    return (
      <Table.Row>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.patient.uploaded)}</Table.Cell>
        <Table.Cell>{this.props.patient.vaccineType}</Table.Cell>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.patient.dose1Date)}</Table.Cell>
        {this.props.patient.dose2Date - new Date('January 01, 1970 00:00:00') !== 0 &&
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.patient.dose2Date)}</Table.Cell>
        }
        {this.props.patient.dose2Date - new Date('January 01, 1970 00:00:00') === 0 &&
        <Table.Cell>N/A</Table.Cell>
        }
        <Table.Cell>
           <a onClick={() => window.open(this.props.patient.imageUrl, '_blank')}>
           { this.props.patient.imageUrl ? 'View image' : '' }
           </a>
        </Table.Cell>
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
    imageUrl: PropTypes.string,
    // _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VaccinationItem);
