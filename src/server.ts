import express from 'express';
import path from 'path';
import process from 'process';
import request from 'request';

var app = express();

var apiKey = process.env.API_KEY
var port = process.env.PORT || '3000';
let staticPath:string = path.join(__dirname, 'web')
app.use(express.static(staticPath));
console.log(`Static files being loaded from here: ${staticPath}`)

app.get('/api', (req, res) => {
    console.log('API called');
    var options = {
        url: "https://graph.microsoft.com/v1.0/me/drive/root/children",
        headers: {
            "Authorization": "Bearer " + req.headers["X-MS-TOKEN-AAD-ACCESS-TOKEN"],
            "Content-Type": "application/json"
        }
    }
    request.get(options, function(error, res, body){
        if(error){
            throw(error);
        }
        console.log(body);
    })
    res.json({"value":[{"id":1, "title": "Alice in Wonderland"},{"id":2, "title": "Chronicles of Narnia"}]});
});

app.listen(port, () => {
    console.log(`Listening on port 3000 with API key ${apiKey}`);
});

