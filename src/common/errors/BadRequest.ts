import {BaseError,HttpStatusCode} from './BaseError'

export class BadRequest extends BaseError {
    constructor(description = 'Bad Request') {
        super('Bad Request', HttpStatusCode.BAD_REQUEST, description,true)
    }
}