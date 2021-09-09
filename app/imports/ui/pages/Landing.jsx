import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' container>

        <Grid.Row>
          <Grid.Column width={12}>
            <h1>The COVID Tracker Application</h1>
            <p>Track the COVID status of users, with ease</p>
          </Grid.Column>

          <Grid.Column width={4}>
            <Image size='small' circular src="https://choosingwiselycanada.org/wp-content/uploads/2020/11/COVID-19_2.png"/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
           <Grid.Column>
            <div className='description'> 
              With the spread of the coronavirus (COVID-19), keeping track of your client's COVID data is more paramount than ever. <br/> 
              The COVID Tracker application allows you to do this seamlessly.
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <h2>Features</h2>
          </Grid.Column>
        </Grid.Row>

        <Grid.Column className='status'>

          <Grid.Row>
            <a className='landing-link'>Check COVID Status</a>
            <div className='description'> 
            Users will be prompted with short questions about their health at the time of check-in, and will be redirected to a page indicating whether they are able to attend campus or not.
            </div>
            <img src='https://www.hawaii.edu/news/wp-content/uploads/2020/08/system-check-in-app-end.jpg'/>
          </Grid.Row>

          <Grid.Row>
            <a className='landing-link'>Update COVID Status</a>
            <div className='description'> 
            The nature of the coronavirus is highly unpredictable. Updating your status only takes a few seconds!
            </div>
            <img src='https://www.hawaii.edu/news/wp-content/uploads/2020/08/system-check-in-app-end.jpg'/>
          </Grid.Row>

        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
