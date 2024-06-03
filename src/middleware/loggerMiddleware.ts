// src/middleware/loggerMiddleware.ts

import { Request, Response, NextFunction } from 'express';

function loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);
  next();
}

export default loggerMiddleware;
