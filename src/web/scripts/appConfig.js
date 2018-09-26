appConfig = {
    instance:"https://login.microsoftonline.com/",
    tenant: "microsoft.onmicrosoft.com",
    clientId:"88931788-aa7a-4dde-ac24-7c5725d612f0",
    postLogoutRedirectUrl: window.location.hash,
    redirectUri: 'http://localhost:3000',
    responseType:'id',
    cacheLocation:'localStorage'
}

module.exports = appConfig;