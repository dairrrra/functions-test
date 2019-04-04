'use strict';

var validate = require("validate.js");
const { ValidationException } = require('../Common/exception');
const { executeHttpTrigger } = require('../Common/execute-http-trigger');

module.exports = async function (context, req) {
    context.log(req);
    await executeHttpTrigger(async() => {
        await validateRequest(context, req)
        return {
            text: 'Hello ' + req.query.name
        };
    },context, req)

};

async function validateRequest(context, req) {
    const constraints = {
        name: {
            presence: {
                allowEmpty: false
            }
        },
        age: {
            presence: {
                allowEmpty: false
            },
            format: {
                pattern: /\d{1,3}/,
                message: function(value, attribute, validatorOptions, attributes, globalOptions) {
                    return validate.format("^%{num} is not a valid format", {
                        num: value
                    });
                }
            },
        }
    };

    const errors = await validate({name: req.query.name, age: req.query.age}, constraints);
    if (errors) {
        throw new ValidationException(errors);
    };
};
