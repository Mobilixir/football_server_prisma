import { Application } from 'express';

import authRoute from './authRoute';
import teamRoute from './teamRoute';
import userRoute from './userRoute';
import matchRoute from './matchRoute';
import matchstatRoute from './matchstatRoute';

export default function setupRoutes(app: Application) {
  app.use(authRoute);
  app.use(teamRoute);
  app.use(userRoute);
  app.use(matchRoute);
  app.use(matchstatRoute);
}
