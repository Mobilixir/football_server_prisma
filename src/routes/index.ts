import { Application } from 'express';

import authRoute from './authRoute';
import teamRoute from './teamRoute';

export default function setupRoutes(app: Application) {
  app.use(authRoute);
  app.use(teamRoute);
}
