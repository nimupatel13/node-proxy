
var express = require('express');


var app = express();

const proxy = require('http-proxy-middleware');


// Config
const { routes } = require('./config.json');


for (var route of routes) {
    app.use(route.route,
        proxy({
            target: route.address,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            }
        })
    );
}


app.listen(80, () => {
    console.log('Proxy listening on port 80');
});