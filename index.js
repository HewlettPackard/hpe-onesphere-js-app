import express from 'express';
import chalk from 'chalk';

// Instantiate our express application.
const app = express();

// Easy logging.
const log = (output, color = chalk.green) => (typeof output === 'object'
  ? console.log(color(JSON.stringify(output, null, 2)))
  : console.log(color(output)));

// Allow all origins.
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
