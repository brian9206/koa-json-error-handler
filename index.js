/**
 * koa-json-error-handler
 */
const HttpStatus = require('http-status-codes');

module.exports = async function json_error_handler(ctx, next) {
    // catch all errors
    try {
        await next();

        // handle http errors
        if (ctx.status >= 400) {
            const httpError = new Error(`HTTP Error ${ctx.status}: ${HttpStatus.getStatusText(ctx.status)}`);
            httpError.status = ctx.status;

            throw httpError;
        }
    }
    catch (err) {
        const status = err.status || 500;

        ctx.body = {
            result: false,
            reason: (() => {
                if (status >= 500) {
                    return `HTTP Error ${ctx.status}: ${HttpStatus.getStatusText(ctx.status)}`;
                }
    
                if (err && err.message) {
                    return err.message.toString();
                }
    
                return undefined;
            })()
        };
        ctx.status = status;

        ctx.app.emit('error', err, ctx);
        return;
    }
}
