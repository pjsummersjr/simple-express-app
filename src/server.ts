import express from 'express';
import path from 'path';
import process from 'process';

var app = express();

var apiKey = process.env.API_KEY
var port = process.env.PORT || '3000';
let staticPath:string = path.join(__dirname, 'web')
app.use(express.static(staticPath));
console.log(`Static files being loaded from here: ${staticPath}`)

app.get('/api', (req, res) => {
    console.log('API called');
    res.json({"value":[{"id":1,"Title":"Alice in Wonderland"},{"id":2,"Title":"Chronicles of Narnia"}]});
});

app.listen(port, () => {
    console.log(`Listening on port 3000 with API key ${apiKey}`);
});

