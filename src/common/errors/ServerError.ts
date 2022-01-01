import {BaseError,HttpStatusCode} from './BaseError'

export class ServerError extends BaseError {
    constructor(description = 'Server error') {
        super('Internal Server Error', HttpStatusCode.INTERNAL_SERVER, description,true)
    }
}