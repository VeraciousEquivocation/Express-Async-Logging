import express, {NextFunction, Request, Response} from 'express';
import {theAppRouter} from './routes'
import {errorHandler} from './common/errors/ErrorHandler'

import { ContextAsyncHooks, ETrackKey } from './common/hooks/ContextHook';
import { LoggerTraceability } from './common/Logger';

const app = express();
const Logger = LoggerTraceability.getInstance().getLogger()

ContextAsyncHooks.trackKey = ETrackKey['X-Correlation-ID']

const port = '3000';

app.listen(port, () => {
    Logger.info(`App is listening on port ${port}`);
})

// handle json messages
app.use(express.json())

app.use(ContextAsyncHooks.getExpressMiddlewareTracking())

app.use('/our-api/routes',theAppRouter)

// all errors passed along to here
app.use(async (error: Error, req: Request, res: Response, next:NextFunction) => {
    await errorHandler.handleError(error, res)
})

Logger.info('APPLICATION HAS STARTED')