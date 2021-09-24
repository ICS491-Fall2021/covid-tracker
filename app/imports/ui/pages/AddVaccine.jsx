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
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddVaccine extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { patientNumber, vaccineType } = data;
    const user = Meteor.user().username;
    const uploaded = new Date();
    Patients.collection.insert({ user, uploaded, patientNumber, vaccineType/*, doseId1, doseId2 */ },
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
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#375739" fillOpacity="1" d="M0,128L80,117.3C160,107,320,85,480,112C640,139,800,213,960,202.7C1120,
          192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        <Grid container centered>
          <Grid.Column>
            <Header style={{ color: 'white', padding: '50px' }} as="h2" textAlign="center">
              Add Vaccine Info
            </Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='patientNumber' />
                <SelectField name='vaccineType' />
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
