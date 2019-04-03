'use strict';

const httpFunction = require('../../HttpTrigger/index');
const context = require('../Helper/defaultContext')

const DEFAULT_EVENT = {
    query: { 
        name: 'Foge',
        age: '80'
    }
};

test('Success Test', async () => {
    const event = await JSON.parse(JSON.stringify(DEFAULT_EVENT));
    await httpFunction(context, event);
    expect(context.res.status).toEqual(200);
    expect(context.res.message).toEqual('Success');
});

test('ValidationException Test(name undefined)', async () => {
    const event = await JSON.parse(JSON.stringify(DEFAULT_EVENT));
    delete event.query.name;
    await httpFunction(context, event);
    expect(context.res.status).toEqual(400);
    expect(context.res.message).toEqual('Validation Error');
});

test('ValidationException Test(age undefined)', async () => {
    const event = await JSON.parse(JSON.stringify(DEFAULT_EVENT));
    delete event.query.age;
    await httpFunction(context, event);
    expect(context.res.status).toEqual(400);
    expect(context.res.message).toEqual('Validation Error');
});