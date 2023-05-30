const dotenv = require('dotenv');
const C = require('./utils/log');

process.on('uncaughtException', (error) => {
  C(`uncaughtException 💥💥 ${error.name}: ${error.message}`);
});
dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  C(`App running on port ${port}...`);
});

process.on('unhandledRejection', (error) => {
  C(`unhandledRejection 💥💥 ${error.name}: ${error.message}`);
  server.close(() => {
    process.exit(1);
  });
});
