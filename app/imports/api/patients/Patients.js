import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The PatientsCollection. It encapsulates state and variable values for Patients.
 */
class PatientsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PatientsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      user: String,
      uploaded: Date,
      imageUrl: String,
      patientNumber: { label: 'Patient Number', type: Number },
      vaccineType: {
        type: String,
        allowedValues: ['Pfizer-BioNTech', 'Moderna', 'Janssen (Johnson & Johnson)', 'AstraZeneca-AZD1222', 'Sinopharm BIBP-SARS-CoV-2', 'Sinovac-SARS-CoV-2',
          'Gamelya-Sputnik V', 'CanSinoBio', 'Vector - EpiVacCorona', 'Zhifei Longcom - Recombinant Novel', 'IMBCAMS-SARS-CoV-2', 'Novavax'],
      },
      dose1Lot: { label: 'Manufacturer Lot Number', type: Number },
      dose1Date: { label: 'Date Administered', type: Date },
      dose1Site: { label: 'Healthcare Professional or Clinic Site', type: String },
      dose2Lot: { label: 'Manufacturer Lot Number', type: Number },
      dose2Date: { label: 'Date Administered', type: Date },
      dose2Site: { label: 'Healthcare Professional or Clinic Site', type: String },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the PatientsCollection.
 * @type {PatientsCollection}
 */
export const Patients = new PatientsCollection();
