import {Response} from 'express'
import { AuthenticationError } from './AuthenticationError';
import { BadRequest } from './BadRequest';
import { ServerError } from './ServerError';

class ErrorHandler {
    async handleError(err:Error, res: Response): Promise<void> {
        let error;
        if(err instanceof BadRequest) {
            error = err as BadRequest
        } else if(err instanceof AuthenticationError) {
            error = err as AuthenticationError
        } else if(err instanceof ServerError) {
            error = err as ServerError
        } else {
            error = { httpCode: 500, name: 'Internal Server Error', message: err.message}
        }
        let theTime = new Date();
        console.log(`[ERROR: ${error.httpCode} : ${error.name}] ${theTime.toDateString()} ${theTime.toLocaleTimeString()} : ${error.message}`)
        res.status(error.httpCode).send({statusCode: error.httpCode, error: error.name, message: error.message});
    }
}

export const errorHandler = new ErrorHandler();