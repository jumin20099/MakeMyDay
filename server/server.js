const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const test = require('./Router/Router');

const options = {
    key: fs.readFileSync('../cert/localhost-key.pem'),
    cert: fs.readFileSync('../cert/localhost.pem'),
};

app.use('/api', test);

const server = https.createServer(options, app);

server.listen(3002, function () {
    console.log('listening on 3002')
});
