import express from 'express';
import path from 'path';
import process from 'process';

var app = express();

var apiKey = process.env.API_KEY
var port = normalizePort(process.env.PORT || '3000');
let staticPath:string = path.join(__dirname, 'web')
app.use(express.static(staticPath));
console.log(`Static files being loaded from here: ${staticPath}`)

app.get('/', (req, res) => {
    res.send('Hello from Typescript');
});

app.listen(port, () => {
    console.log(`Listening on port 3000 with API key ${apiKey}`);
});

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }