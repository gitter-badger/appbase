var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

//-- Remove server type header
app.disable('x-powered-by');

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');

    console.log('==============================================');
    console.log('****************  APP BASE  ******************');

    console.log('| ENV : '+ process.env.NODE_ENV);
    console.log('| Web server listening at : %s', baseUrl);
    
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('| API browser running at  :  %s%s', baseUrl, explorerPath);
    }
    console.log('==============================================');
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
