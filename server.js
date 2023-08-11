import config from 'config';
import mongoose from 'mongoose';

import app from './app';
import C from './utils/log';

/**
 * uncaughtException means no code was looking for that exception
 */
process.on('uncaughtException', (error) => {
  C(`uncaughtException 💥💥 ${error.name}: ${error.message}`);
});

/**
 * connect to the database
 */

mongoose
  .connect(config.get('DATABASE_LOCAL'), {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => C('DB connection successful!'))
  .catch((error) => C('💥💥 DB connection error', error));

const port = config.get('PORT');
const server = app.listen(port, () => {
  C(`App running on port ${port}...`);
});

/**
 * unhandledrejection event is sent to the global scope of a script when a JavaScript Promise
 * that has no rejection handler is rejected
 */
process.on('unhandledRejection', (error) => {
  C(`unhandledRejection 💥💥 ${error.name}: ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});
