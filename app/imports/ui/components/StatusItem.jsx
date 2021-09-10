import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';


/** Renders a single row in the List Status table. See pages/ListStatus.jsx. */
class StatusItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(this.props.status.createdAt)}</Table.Cell>
        <Table.Cell>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', timeZone: 'HST' }).format(this.props.status.createdAt)}</Table.Cell>
        <Table.Cell>{this.props.status.status}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.status._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
StatusItem.propTypes = {
  status: PropTypes.shape({
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date), // WIP
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StatusItem);
