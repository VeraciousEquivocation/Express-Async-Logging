import express, {NextFunction,Request,Response} from 'express'
import {AuthenticationError,ServerError} from '../common/errors'
import { secondHop } from './services'

import httpStatus from 'http-status'
import { LoggerTraceability } from '../common/Logger'

const Logger = LoggerTraceability.getInstance().getLogger()

const theAppRouter = express.Router()

export { theAppRouter };

theAppRouter.get('/anError', async(req: Request, res: Response, next: NextFunction) => {
    try {
        throw new ServerError('Oh snap doodle, this aint no poodle')
    } catch (err) {
        next(err)
    }
})
theAppRouter.post('/login', async(req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body.email || !req.body.password)
            throw new AuthenticationError('gotta pass me the word to be heard')
        res.status(httpStatus.OK).json({message: 'you may enter'})
    } catch (err) {
        next(err)
    }
})
theAppRouter.get('/hops', async(req: Request, res: Response, next: NextFunction) => {
    Logger.http('THE FIRST HOP')
    secondHop(next)
})