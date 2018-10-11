const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Log individual requests
app.use(morgan('tiny'));

// Serve static files as appropriate
app.use(express.static(`${__dirname}/build`));

// Anything else gets handled by React
app.get('*', (req, res) => res.sendFile(`${__dirname}/build/index.html`));

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
