const proxy = require("http-proxy-middleware");
    module.exports = function(app) {
        app.use(proxy(
            '/auth/facebook', {target: 'http://localhost:5000'},
                        '/auth/linkedin', {target: 'http://localhost:5000'}

            ))
    }