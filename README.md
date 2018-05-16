# koa-json-error-handler
Koa middleware to convert all HTTP error message to JSON response

## Usage
```js
const Koa = require('koa');
const jsonErrorHandler = require('koa-json-error-handler');

const app = new Koa();

app
    .use(jsonErrorHandler)
    .listen(8080);

app.on('error', (err, ctx) => {
    console.log('HTTP error', ctx.status, err);
});
```

The body of the response will be
```json
{
    "result": false,
    "reason": "HTTP Error 404: Not Found"
}
```
