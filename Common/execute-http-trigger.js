'use strict';

const { HttpException, InternalException } = require('../Common/exception');

async function executeHttpTrigger(func, context, req) {
    try {
        const output = await func();
        await success(context, output);
    } catch (err) {
        await error(context, err);
    }
};

async function success(context, output) {
    context.res = {
        status: 200,
        message: 'Success',
        body: output
    };
};

async function error(context, err) {
    if (err instanceof HttpException) {
        context.res = err;
    } else {
        console.log('Error: ', err);
        context.res = await new InternalException();
    };
};

module.exports = {
    executeHttpTrigger
};