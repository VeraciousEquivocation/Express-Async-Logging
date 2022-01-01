import {BaseError,HttpStatusCode} from './BaseError'

export class AuthenticationError extends BaseError {
    constructor(description = 'Unauthorized') {
        super('Unauthorized', HttpStatusCode.UNAUTHORIZED, description,true)
    }
}