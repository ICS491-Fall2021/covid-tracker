import { Meteor } from 'meteor/meteor';
import { Symptoms } from '../../api/stuff/Symptom.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.symptomatic} (${data.owner})`);
  Symptoms.collection.insert(data);
}

// Initialize the SymptomsCollection if empty.
if (Symptoms.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
