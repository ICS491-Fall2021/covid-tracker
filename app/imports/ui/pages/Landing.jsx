import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' container>

        <Grid.Row>
          <Grid.Column width={4}>
            <Image size='small' circular src="https://choosingwiselycanada.org/wp-content/uploads/2020/11/COVID-19_2.png"/>
          </Grid.Column>

          <Grid.Column width={12} textAlign='center'>
            <h1>The COVID Tracker Application</h1>
            <p>Track the COVID status of users, with ease</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <h2>Features</h2>
          </Grid.Column>
        </Grid.Row>

        <Grid.Column fluid>

          <Grid.Row>
            <h3>Page 1</h3>
          </Grid.Row>

          <Grid.Row>
            <h3>Page 2</h3>
          </Grid.Row>

          <Grid.Row>
            <h3>Page 3</h3>
          </Grid.Row>

        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
