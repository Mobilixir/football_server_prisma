import { Request, Response, Router } from 'express';
import authController from '../controller/AuthController';

const AllRouter = Router();
const auth = new authController();

AllRouter.route('/test').get((req: Request, res: Response) => {
  return res.status(200).send({
    message: 'GET request successfulll!!!!',
  });
});

// Login and Registration
AllRouter.route('/api/v1/login').post(auth.login);
AllRouter.route('/api/v1/registration').post(auth.registration);
AllRouter.route('/api/v1/me').get(auth.me);
export default AllRouter;
