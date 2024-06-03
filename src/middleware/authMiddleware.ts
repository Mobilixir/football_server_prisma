import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { jwt_token } from '../utils/config';

const excludedPaths = ['/api/v1/login', '/api/v1/registration', '/test'];

export interface AuthenticatedRequest extends Request {
  userId?: string;
}
// Middleware function to verify JWT token
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (excludedPaths.includes(req.path)) {
    return next();
  }
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authorization.split(' ')[1];

  jwt.verify(token, jwt_token, (err: jwt.JsonWebTokenError | TokenExpiredError | null) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).json({ message: 'Token Expired' });
      }
      return res.status(401).json({ message: 'Invalid Token' });
    }
    next();
  });
};

export default authenticateToken;
