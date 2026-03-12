require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8003;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`cats-node-api listening on port ${PORT}`);
});
