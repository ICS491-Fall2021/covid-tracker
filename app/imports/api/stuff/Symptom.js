import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The SymptomsCollection. It encapsulates state and variable values for symptoms.
 */
 class SymptomsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'SymptomsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      symptomatic: Boolean,
      createdAt: Date,
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the SymptomsCollection.
 * @type {SymptomsCollection}
 */
 export const Symptoms = new SymptomsCollection();