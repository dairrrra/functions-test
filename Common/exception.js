'use strict';

class HttpException {
    constructor(message, status) {
        this.status = status;
        this.message = message;
    }

    async getBody() {
        return {
            status: this.status,
            message: this.message
        };
    }

    async getStatus() {
        return this.status;
    }

};

class ValidationException extends (HttpException) {
    constructor(ex) {
        const status = 400;
        const message = 'Validation Error';
        super(message, status);
        this.errors = ex;
    }
};

class NotFoundException extends (HttpException) {
    constructor(ex) {
        const status = 404;
        const message = 'Not Found';
        super(message, status);
    }
};

class InternalException extends (HttpException) {
    constructor(ex) {
        const status = 500;
        const message = 'Internal Server Error';
        super(message, status);
    }
};

module.exports = {
    HttpException,
    ValidationException,
    NotFoundException,
    InternalException
};
