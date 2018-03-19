import express from 'express';

// Instantiate our express application.
const app = express();

// Easy logging.
const log = json => console.log(chalk.green(JSON.stringify(json, null, 2)));

// Create a GET route to our base url.
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Listen for requests at a specified port, 3000.
app.listen(3001, () => {
  // Send a message to our terminal window that we're ready for action.
  console.log('Server listening to http://localhost:3001');
});
