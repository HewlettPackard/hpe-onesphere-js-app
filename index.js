import express from 'express';
import chalk from 'chalk';
import OneSphere from '@hpe/hpe-onesphere-js';

// Instantiate our express application.
const app = express();

// Instantiate our OneSphere instance.
const oneSphere = new OneSphere('https://deic02-hpe.hpeonesphere.com');

// Easy logging.
const log = (output, color = chalk.green) => (typeof output === 'object'
  ? console.log(color(JSON.stringify(output, null, 2)))
  : console.log(color(output)));

oneSphere.postSession({
  username: 'amejias@hpe.com',
  password: '***',
})
  .then(() => {
    oneSphere.getProjects({ view: 'full' })
      .then(projects => projects.members.map(project => log(project)))
      .catch(projectError => log(projectError, chalk.red));
  })
  .catch(responseError => log(responseError, chalk.red));

// Allow of origins.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Create a GET route to our base url.
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Listen for requests at a specified port, 3000.
app.listen(3001, () => {
  // Send a message to our terminal window that we're ready for action.
  log('Server listening to http://localhost:3001');
});
