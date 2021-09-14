import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Statuses } from '../../api/status/Status';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  status: {
    type: String,
    allowedValues: ['Not Inputted', 'Clear', 'Not clear'],
    defaultValue: 'Not Inputted',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddStatus extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { status } = data;
    const owner = Meteor.user().username;
    const createdAt = new Date(); // WIP
    Statuses.collection.insert({ status, owner, createdAt},
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
      <div class="wrap">
      <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#375739" fill-opacity="1" d="M0,128L80,117.3C160,107,320,85,480,112C640,139,800,213,960,202.7C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      <Grid container centered>
        <Grid.Column>
        <Header style={{color: "white", padding: "50px"}} as="h2" textAlign="center">
            Add Status
          </Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
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
