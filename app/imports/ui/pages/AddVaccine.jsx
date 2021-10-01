import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, DateField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Patients } from '../../api/patients/Patients';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  patientNumber: { label: 'Patient Number', type: Number },
  vaccineType: {
    type: String,
    allowedValues: ['Pfizer-BioNTech', 'Moderna', 'Janssen (Johnson & Johnson)', 'AstraZeneca-AZD1222', 'Sinopharm BIBP-SARS-CoV-2', 'Sinovac-SARS-CoV-2',
      'Gamelya-Sputnik V', 'CanSinoBio', 'Vector - EpiVacCorona', 'Zhifei Longcom - Recombinant Novel', 'IMBCAMS-SARS-CoV-2', 'Novavax'],
  },
  dose1Lot: { label: 'Manufacturer Lot Number', type: Number },
  dose1Date: { label: 'Date Administered', type: Date },
  dose1Site: { label: 'Healthcare Professional or Clinic Site', type: String },
  dose2Lot: { label: 'Manufacturer Lot Number', type: Number, optional: true },
  dose2Date: { label: 'Date Administered', type: Date, optional: true },
  dose2Site: { label: 'Healthcare Professional or Clinic Site', type: String, optional: true },

});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddVaccine extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { patientNumber, vaccineType, dose1Lot, dose1Date, dose1Site } = data;
    let { dose2Lot, dose2Date, dose2Site } = data;
    const user = Meteor.user().username;
    const uploaded = new Date();
    if (typeof dose2Lot === 'undefined') {
      dose2Lot = 0;
    }
    if (typeof dose2Date === 'undefined') {
      dose2Date = new Date('January 01, 1970 00:00:00');
    }
    if (typeof dose2Site === 'undefined') {
      dose2Site = 'N/A';
    }

    Patients.collection.insert({ user, uploaded, patientNumber, vaccineType, dose1Lot, dose1Date, dose1Site, dose2Lot, dose2Date, dose2Site },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <div className="wrap">
        <Grid container centered>
          <Grid.Column>
            <Header style={{ color: 'white', padding: '100px 0px 50px' }} as="h2" textAlign="center">
              Add Vaccine Info
            </Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='patientNumber' placeholder={'Medical record of IIS record number'}/>
                <SelectField name='vaccineType' />
                <Header as="h4">Dose 1</Header>
                <TextField name='dose1Lot' placeholder={'From vaccination card'}/>
                <DateField name='dose1Date' placeholder={'mm/dd/yyyy'}/>
                <TextField name='dose1Site' placeholder={'From vaccination card'}/>
                <Header as="h4">Dose 2 (leave blank for Johnson & Johnson)</Header>
                <TextField name='dose2Lot' placeholder={'From vaccination card'} required={false}/>
                <DateField name='dose2Date' placeholder={'mm/dd/yyyy'} required={false}/>
                <TextField name='dose2Site' placeholder={'From vaccination card'} required={false}/>
                <SubmitField value='Submit' />
                <ErrorsField />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddVaccine;
