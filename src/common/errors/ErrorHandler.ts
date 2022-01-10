import {Response} from 'express'
import { AuthenticationError } from './AuthenticationError';
import { BadRequest } from './BadRequest';
import { ServerError } from './ServerError';

import {LoggerTraceability} from '../Logger'

const Logger = LoggerTraceability.getInstance().getLogger()

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
        // let theTime = new Date();
        //(`[ERROR: ${error.httpCode} : ${error.name}] ${theTime.toDateString()} ${theTime.toLocaleTimeString()} : ${error.message}`)
        Logger.error(`[${error.httpCode + '-' + error.name}]: ${error.message}`)
        res.status(error.httpCode).send({statusCode: error.httpCode, error: error.name, message: error.message});
    }
}

export const errorHandler = new ErrorHandler();