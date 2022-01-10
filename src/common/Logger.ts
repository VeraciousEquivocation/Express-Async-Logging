/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import {Logger, createLogger, format, transports,LoggerOptions, addColors } from 'winston'

import { ContextAsyncHooks } from './hooks/ContextHook';

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

addColors(colors);

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

export class LoggerTraceability {
    private static instance: LoggerTraceability;
    
    private logger: Logger

    private constructor() {
        this.logger = createLogger(LoggerTraceability.getLoggerOptions())
    }

    public static getInstance(): LoggerTraceability {
        if(!LoggerTraceability.instance)
            LoggerTraceability.instance = new LoggerTraceability

        return LoggerTraceability.instance
    }

    public static configure(options: LoggerOptions) : void {
        LoggerTraceability.getInstance().getLogger().configure(options)
    }

    public static getLoggerOptions(): LoggerOptions {
        const traceFormat = format.printf((info) => {
            const requestInfo = ContextAsyncHooks.getContext();
            if (requestInfo && requestInfo[ContextAsyncHooks.trackKey]) {
                info[ContextAsyncHooks.trackKey] = requestInfo[ContextAsyncHooks.trackKey]
            }

            let showTrackId = (!(info.message === 'APPLICATION HAS STARTED') && !(info.message.includes('App is listening on port')))

            return `[${info.level}] : ${info.timestamp}:${showTrackId && `[Tracking-Id]:${info['X-Correlation-ID']}`} - ${info.message}`
        })

        return {
            level: 'debug', // max logging level
            levels,
            silent: false,
            format: format.combine(
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms' }),
                traceFormat,
                format.metadata({ fillExcept: ['timestamp', 'service', 'level', 'message']}),
                format.colorize( {all: true} ),
            ),
            transports: [new transports.Console()],
        }
    }

    public getLogger(): Logger {
        return this.logger
    }
}