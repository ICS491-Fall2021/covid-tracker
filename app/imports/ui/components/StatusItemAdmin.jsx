import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Status (Admin) table. See pages/ListStatusAdmin.jsx. */
class StatusItemAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.Status.name}</Table.Cell>
        <Table.Cell>{this.props.Status.quantity}</Table.Cell>
        <Table.Cell>{this.props.Status.condition}</Table.Cell>
        <Table.Cell>{this.props.Status.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
StatusItemAdmin.propTypes = {
  Status: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default StatusItemAdmin;
