
var config = require('./appConfig.js');

document.getElementById('login').addEventListener("click", login);
document.getElementById('logout').addEventListener("click", logout);
document.getElementById('getstuff').addEventListener("click", getstuff);

var authContext = new AuthenticationContext(config);


console.log('Initialized authContext');
var isCallback = authContext.isCallback(window.location.hash);
authContext.handleWindowCallback();

if(isCallback && !authContext.getLoginError()){
    window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
}

var user = authContext.getCachedUser();

if(user){
    console.log(user);
    document.getElementById('status').innerHTML = `<span>Logged in: ${user.profile.name}</span>`;
}

function login() {
    console.log('Logging in');
    document.getElementById('status').innerHTML = "<span>Just logging in</span>";
    authContext.login();
}

function logout(){
    console.log('Logging out');
    document.getElementById('status').innerHTML = "<span>Just logging out</span>";
    authContext.logOut();
}

function getstuff() {

    document.getElementById("stuff").innerHTML = "<p>You got some stuff</p>";
}

function loadContent() {
    var req = new XMLHttpRequest();
    req.addEventListener('load', function() {
        document.getElementById('app').innerHTML = this.responseText;
    })
    
    req.open("GET", "/api");
    req.send();
}


