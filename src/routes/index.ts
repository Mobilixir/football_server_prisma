// src/routes/SetupRoutes.ts

import { Application } from 'express';
import authRoute from './authRoute';

export default function setupRoutes(app: Application) {
  app.use(authRoute);
}
