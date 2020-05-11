import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import express, {Request, Response, NextFunction} from 'express';
import {BAD_REQUEST} from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import expressWs from 'express-ws';
import sockets from "./Sockets";
import {Terminal} from "./WS/Terminal";


// Init express
const {app} = expressWs(express());

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', cors(), BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

app.get('/', (req: Request, res: Response) => {
    res.json({result: 'BAD REQUEST'})
});

app.ws('/websocket', (ws, req) => {
    sockets.push('/websocket', ws, req);
});

app.ws('/terminal-websocket/:command/:id', (ws, req) => {
    new Terminal(ws, req);
});

// Export express instance
export default app;
