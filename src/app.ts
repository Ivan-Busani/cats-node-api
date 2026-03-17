import 'dotenv/config';
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const PORT = parseInt(process.env.PORT || '8003', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`cats-node-api listening on port ${PORT}`);
});
