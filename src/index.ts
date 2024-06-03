import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { port } from './utils/config';

import loggerMiddleware from './middleware/loggerMiddleware';
import authenticateToken from './middleware/authMiddleware';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticateToken);
app.use(loggerMiddleware);
app.use(express.json());

app.listen(port, () => {
  console.log(`\n\n***** API started at http://localhost:${port} ***** \n\n`);
});
