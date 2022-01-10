import {NextFunction} from 'express'
import {AuthenticationError,BadRequest} from '../common/errors'

export const secondHop = (next: NextFunction) => {
    try {
        throw new BadRequest('ERROR ON SECOND HOP')
    } catch (err) {
        next(err)
    }
}