const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Wire up Socket.io
const httpServer = require('http').Server(app);
const realTimeServer = require('socket.io')(httpServer);

var id = 0;
realTimeServer.on('connection', socket => {
  console.log('connection', socket.id);

  socket.on('SEND_MESSAGE', message => {
    console.log('socket event', 'SEND_MESSAGE');

    // Send just to the person we received this from
    // socket.emit('RECEIVE_MESSAGE', { message: 'You sent a message!' });

    realTimeServer.emit('RECEIVE_MESSAGE', {
      ...message,
      id: ++id,
      timestamp: new Date(),
    });
  });
});

realTimeServer.on('disconnect', () => {
  console.log('disconnect', realTimeServer.id);
});

realTimeServer.on('error', error => {
  console.error(error);
});

// Log individual requests
app.use(morgan('tiny'));

// Serve static files as appropriate
app.use(express.static(`${__dirname}/build`));

// Anything else gets handled by React
app.get('*', (req, res) => res.sendFile(`${__dirname}/build/index.html`));

httpServer.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
