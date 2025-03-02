const express = require('express');
const { postgraphile } = require('postgraphile');

// Initialize Express app
const app = express();

// PostgreSQL connection details
const DATABASE_URL = 'postgres://postgres:root@localhost:5432/reactapp';

// PostGraphile options
const options = {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  dynamicJson: true,
  enableCors: true,
  corsAllowOrigin: 'http://localhost:3000',
  disableQueryLog: false,
  allowExplain: true, // Allows debugging queries
};


// Mount PostGraphile middleware
app.use(postgraphile(DATABASE_URL, 'public', options));

// Start the server
app.listen(5000, () => {
  console.log('🚀 Server is running on http://localhost:5000/graphiql');
});