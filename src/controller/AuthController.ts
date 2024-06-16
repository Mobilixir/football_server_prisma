import Bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import _ from 'lodash';

import prismaClient from '../utils/database';
import Helper from '../utils/helper';
import loginValidation from './validations/auth/loginValidation';
import registrationValidation from './validations/auth/registrationValidation';

class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = loginValidation(body);

      if (!isValid) {
        return res.status(400).json({ status: false, message: 'error', errors: errors });
      }

      const user = await prismaClient.user.findUnique({ where: { email: body.email } });
      if (user) {
        const passwordCheck = await Bcrypt.compare(body.password, user.hash_password);
        if (passwordCheck) {
          const token = Helper.createJwtAuthToken(user);
          const loggedin_user = _.pick(user, ['first_name', 'last_name', 'role', 'email', 'mobile_number', 'id']);
          return res.status(200).send({
            status: true,
            message: 'Logged-in successfully.',
            data: { token, user: loggedin_user },
          });
        } else {
          return res.status(200).send({
            status: false,
            message: 'Wrong Username / Password. Please check credentials.',
            data: {},
          });
        }
      } else {
        return res.status(200).send({
          status: false,
          message: 'Wrong Username / Password. Please check credentials.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async registration(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = registrationValidation(body);

      if (!isValid) {
        return res.status(400).json({ status: false, message: 'error', errors: errors });
      }

      const user = await prismaClient.user.findFirst({ where: { email: body.email } });
      if (Helper.isEmpty(user)) {
        const salt = await Bcrypt.genSalt(10);
        body.hash_password = await Bcrypt.hash(body.password, salt);
        delete body['password'];
        delete body['confirm_password'];
        const created_user = await prismaClient.user.create({ data: { ...body } });
        return res.status(200).send({
          status: true,
          message: 'User created successfully.',
          data: _.pick(created_user, ['first_name', 'last_name', 'role', 'email', 'mobile_number', 'id']),
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'User already exists.',
          data: [],
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async me(req: Request, res: Response) {
    try {
      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const user = await prismaClient.user.findFirst({
        where: { id: user_id },
        select: Helper.prismaExclude('User', ['hash_password']),
      });

      if (user) {
        return res.status(200).send({
          status: true,
          message: 'Profile fetched successfully.',
          data: user,
        });
      } else {
        return res.status(404).send({
          status: false,
          message: 'User not found. Please register.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }
}
export default AuthController;
