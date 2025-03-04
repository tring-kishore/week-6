const express = require('express');
const { postgraphile } = require('postgraphile');
const app = express();
const DATABASE_URL = 'postgres://postgres:root@localhost:5432/reactapp';
const options = {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  dynamicJson: true,
  enableCors: true,
  corsAllowOrigin: 'http://localhost:3000',
};

app.use(postgraphile(DATABASE_URL, 'public', options));

// Start the server
app.listen(5000, () => {
  console.log('the Server is running on http://localhost:5000/graphiql');
});