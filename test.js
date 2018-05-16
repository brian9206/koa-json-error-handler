const Koa = require('koa');
const jsonErrorHandler = require('./index.js');

// start a simple Koa app
const app = new Koa();

app
    .use(jsonErrorHandler)
    .listen(8080);

app.on('error', (err, ctx) => {
    console.log(err);
});
