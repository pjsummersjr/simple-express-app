import express from 'express';
import path from 'path';
import process from 'process';
import request from 'request';
import q from 'q';

var app = express();

var apiKey = process.env.API_KEY;
var apiHost = process.env.API_SERVICE_HOST;
var appId = process.env.SERVER_APP_ID;
var port = process.env.PORT || '3000';
let staticPath:string = path.join(__dirname, 'web')
app.use(express.static(staticPath));
console.log(`Static files being loaded from here: ${staticPath}`)

app.get('/api', (req, res) => {
    console.log('API called');
    
    var expressResponse = res;

    getApiToken(req.get('Authorization').split(' ')[1]).then(
        function(token) {
            var options = {
                url: "https://graph.microsoft.com/v1.0/me/drive/root/children",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }      
            }    
            request.get(options, function(error, graphResponse, body){
                if(error){
                    throw(error);
                }
                console.debug(body);
                expressResponse.json(body);
            });
        },
        function(error){
            console.error(`Error returned from the getting API token:`);
            console.error(error);
        }
    );
});

app.listen(port, () => {
    console.log(`Listening on port 3000`);
});


function getApiToken(requestToken): Q.Promise<any> {
    var deferred = q.defer();
    var config = {
        tenantid:"microsoft.onmicrosoft.com",
        grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",
        client_id: appId,
        client_secret: apiKey,
        assertion: requestToken,
        requested_token_use: "on_behalf_of",
        resource:"https://graph.microsoft.com"
    }
    var requestString=`https://login.microsoftonline.com/${config.tenantid}/oauth2/token`;
    
    console.debug("==============RETRIEVING SERVICE ACCESS TOKEN===================");
    console.debug(requestString);
    
    request.post({uri:requestString, form: config}, 
        function(error, res, body) {
            if(error) {
                console.error("Error retrieving access token:");
                console.error(error);
                return deferred.reject(error);
            }
            if(res && res.statusCode === 200) {
                console.log("Received valid token:");
                let dataAsJson = JSON.parse(body);
                console.log(dataAsJson.access_token);
                return deferred.resolve(dataAsJson.access_token);
            }    
            else {
                return deferred.reject(`Invalid response returned (${res.statusCode}): ${res.message}`);
            }        
        }    
    )
    return deferred.promise;
}

