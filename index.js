import express from 'express';
import chalk from 'chalk';
import OneSphere from '@hpe/hpe-onesphere-js';
import dotEnv from 'dotenv';

// Instantiate our express application.
const app = express();

// Gather our environment variables.
dotEnv.config();

// Destructured env variables.
const {
  API_PORT,
  ONESPHERE_API_URL,
  ONESPHERE_USERNAME,
  ONESPHERE_PASSWORD,
} = process.env;

// Instantiate our OneSphere instance.
const oneSphere = new OneSphere(ONESPHERE_API_URL);

// Easy logging.
const log = (output, color = chalk.green) => (typeof output === 'object'
  ? console.log(color(JSON.stringify(output, null, 2)))
  : console.log(color(output)));

oneSphere.postSession({
  username: ONESPHERE_USERNAME,
  password: ONESPHERE_PASSWORD,
})
  .then(() => {
    oneSphere.getProjects({ view: 'full' })
      .then(projects => projects.members.map(project => log(project)))
      .catch(projectError => log(projectError, chalk.red));
  })
  .catch(responseError => log(responseError, chalk.red));

// Create a GET route to our base url.
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Listen for requests at a specified port, 3000.
app.listen(API_PORT, () => {
  // Send a message to our terminal window that we're ready for action.
  log(`Server listening to http://localhost:${API_PORT}`);
});
