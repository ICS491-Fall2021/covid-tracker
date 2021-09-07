import { Meteor } from 'meteor/meteor';
import { Statuses } from '../../api/status/Status.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.status} (${data.owner})`);
  Statuses.collection.insert(data);
}

// Initialize the StatusesCollection if empty.
if (Statuses.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
