import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Statuses } from '../../api/status/Status';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  status: {
    type: String,
    allowedValues: ['Clear', 'Not clear'],
    defaultValue: 'Clear',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddStatus extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { status } = data;
    const owner = Meteor.user().username;
    const createdAt = new Date();
    Statuses.collection.insert({ status, owner, createdAt },
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
            Add Status
            </Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
              Are you experiencing any of the following symptoms?
                <ul>
                  <li>Fever or chills</li>
                  <li>Cough</li>
                  <li>Shortness of breath or difficulty breathing</li>
                  <li>Fatigue</li>
                  <li>Muscle or body aches</li>
                  <li>Headache</li>
                  <li>New loss of taste or smell</li>
                  <li>Sore throat</li>
                  <li>Congestion or runny nose</li>
                  <li>Nausea or vomiting</li>
                  <li>Diarrhea</li>
                </ul>
              Have you been in contact with someone who has tested positive in the last 10 days?
              If you answered no to both questions, you are Clear. <hr/>
                <SelectField name='status' />
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

export default AddStatus;
