import express from 'express';
import path from 'path';
import process from 'process';

var app = express();

var apiKey = process.env.API_KEY

let staticPath:string = path.join(__dirname, 'web')
app.use(express.static(staticPath));
console.log(`Static files being loaded from here: ${staticPath}`)

app.get('/', (req, res) => {
    res.send('Hello from Typescript');
});

app.listen(3000, () => {
    console.log(`Listening on port 3000 with API key ${apiKey}`);
});

