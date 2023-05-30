const app = require('./app');
const C = require('./utils/log');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  C(`App running on port ${port}...`);
});
