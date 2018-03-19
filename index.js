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
});

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

app.get('/api/ping', (req, res) => {
  res.send('Pong!');
});

app.get('/api/session', (req, res) => {
  oneSphere.getSession()
    .then(session =>
      oneSphere.getUser(session.userUri)
        .then(user => res.status(200).send({ session, user })));
});

app.get('/api/projects', (req, res) => {
  oneSphere.getProjects({ view: 'full' })
    .then(projects => res.status(200).send(projects))
    .catch(projectsError => res.status(400).send(projectsError));
});

app.get('/api/tags', (req, res) => {
  oneSphere.getTags({ view: 'full' })
    .then(tags => res.status(200).send(tags))
    .catch(tagsError => res.status(400).send(tagsError));
});

// Listen for requests at a specified port, 3000.
app.listen(API_PORT, () => {
  // Send a message to our terminal window that we're ready for action.
  log(`Server listening to http://localhost:${API_PORT}`);
});
