const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const bodyParser = require('body-parser');
const measure_router = require('./routers/measure.js');
const user_router = require('./routers/user.js');
const procedure_router = require('./routers/procedure');
const port = process.env.PORT || 2020;

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.json({
    value:
      '정밀측정장비를 원격으로 다루기 위한 node.js express 기반 REST API 서버 입니다.',
  });
});
app.use('/meas', measure_router);
app.use('/user', user_router);
app.use('/procedure', procedure_router);
app.use('/pr', procedure_router);
io.on('connection', (socket) => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.on("chat message", msg => {
    console.log(`${id}: ${msg}`);
  });
});

server.listen(port, () => {
  console.log(`express server is running on ${port}`);
});
