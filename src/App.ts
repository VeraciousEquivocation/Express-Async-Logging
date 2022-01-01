import express, {NextFunction, Request, Response} from 'express';
import {theAppRouter} from './routes'
import {errorHandler} from './common/errors/ErrorHandler'

const app = express();

const port = '3000';

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

// handle json messages
app.use(express.json())

// where we handle our winston logging
//app.use(LOGGIN)

app.use('/our-api/routes',theAppRouter)

// all errors passed along to here
app.use(async (error: Error, req: Request, res: Response, next:NextFunction) => {
    await errorHandler.handleError(error, res)
})

console.log('APPLICATION STARTED')