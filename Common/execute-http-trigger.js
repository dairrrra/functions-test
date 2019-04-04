'use strict';

const { HttpException, InternalException } = require('./exception');

const HEADERS = {
    'Content-Type': 'application/json'
};


/**
 * Httptrigger common main function.
 *
 * @param {*} func
 * @param {*} context
 * @param {*} req
 */
async function executeHttpTrigger(func, context, req) {
    try {
        const data = await func();
        await success(context, data);
    } catch (err) {
        await fail(context, err);
    }
};

/**
 * Success output.
 *
 * @param {*} context
 * @param {*} data
 */
async function success(context, data) {
    const output = {
        status: 200,
        message: 'Success'
    };
    if (data) output.body = data;
    context.res = {
        status: 200,
        headers: HEADERS,
        body: output
    };
};

/**
 * Fail output.
 *
 * @param {*} context
 * @param {*} err
 */
async function fail(context, err) {
    if (!(err instanceof HttpException)) {
        err = new InternalException();
    }
    context.res = {
        status: await err.getStatus(),
        headers: HEADERS,
        body: await err.getBody()
    };
};

module.exports = {
    executeHttpTrigger
};
