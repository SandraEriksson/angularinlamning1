const http = require('http');
const app = require('./app');
const port = process.env.port || 5000;

http.createServer(app).listen(port);