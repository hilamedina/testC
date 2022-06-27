const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const router = require('./src/route/route');
const cron = require('node-cron');
const helmet = require('helmet');

const app = express();
app.use('/', router);

app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.listen(5000, () => {
  console.log(`listening on port 5000`);
  const updateByTime = cron.schedule('* 15 * * *', () => {
    console.log('running every 15  minute ');
  });
});
