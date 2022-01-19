
class ApplicationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ApplicationError';

        Error.captureStackTrace(this, MyError)
    }
}

module.exports = ApplicationError;