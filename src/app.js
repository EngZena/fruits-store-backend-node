import config from 'config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import xss from 'xss-clean';

import fruitRouter from './routes/fruitRoutes';
import userRouter from './routes/userRoutes';
import AppError from './utils/appError';

const app = express();

/**
 * helmet helps secure Node.js applications by setting several HTTP headers.
 * It acts as middleware for Express.
 */
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
    },
  })
);

/**
 * morgan is a Node.js and Express middleware to log HTTP requests and errors, and simplifies the process
 */
if (config.get('NODE_ENV') === 'development') {
  app.use(morgan('dev'));
}

/**
 * rateLimit a technique used to control the amount of incoming or outgoing traffic within a network.
 */
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: 'Too many request from this IP please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 })
);

/**
 * xss is a module used to filter input from users to prevent XSS attacks
 */
app.use(xss());

/**
 *  cors is an HTTP-header based mechanism that allows a server to indicate any domain other than
 *  its own from which a browser should permit loading resources.
 */
app.use(cors());
app.options('=', cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/api/crm/v1/users', userRouter);
app.use('/api/crm/v1/fruit', fruitRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

export default app;
