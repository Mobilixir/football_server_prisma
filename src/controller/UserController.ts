import { Request, Response } from 'express';
import _ from 'lodash';

import eUserType from '../enum/userType';
import Helper from '../utils/helper';
import prismaClient from '../utils/database';

class UserController {
  public async getUserRoleList(req: Request, res: Response) {
    try {
      const userTypes = Object.entries(eUserType)
        .filter((type) => type[1] != eUserType.ADMIN)
        .map((type) => {
          return type[1];
        });

      return res.status(200).send({
        status: true,
        message: 'User types fetched successfully.',
        data: { user_types: userTypes },
      });
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async updateUserRole(req: Request, res: Response) {
    try {
      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, eUserType.ADMIN);

      if (response) {
        const { role, id } = req.body;
        const user = await prismaClient.user.findUnique({ where: { id: id } });
        if (user) {
          const updated_user = await prismaClient.user.update({ data: { role: role }, where: { id: id } });
          return res.status(200).send({
            status: true,
            message: 'User role updated successfully.',
            data: { user: _.pick(updated_user, ['first_name', 'last_name', 'role', 'email', 'mobile_number', 'id']) },
          });
        } else {
          return res.status(200).send({
            status: false,
            message: 'User does not exists.',
            data: {},
          });
        }
      } else {
        throw response;
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async updateUserTeam(req: Request, res: Response) {
    try {
      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, eUserType.ADMIN);
      if (response) {
        const { teamId, id } = req.body;
        const user = await prismaClient.user.findUnique({ where: { id: id, role: eUserType.PLAYER } });
        if (user) {
          const updated_user = await prismaClient.user.update({ data: { teamId: teamId }, where: { id: id } });

          return res.status(200).send({
            status: true,
            message: 'User team updated successfully.',
            data: { user: _.pick(updated_user, ['first_name', 'last_name', 'role', 'email', 'mobile_number', 'id']) },
          });
        } else {
          return res.status(200).send({
            status: false,
            message: 'Player does not exists.',
            data: {},
          });
        }
      } else {
        throw response;
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getPlayersByTeamId(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const players = await prismaClient.user.findMany({ where: { role: eUserType.PLAYER, teamId: id } });
      console.log('🚀 ~ UserController ~ getPlayersByTeamId ~ players:', players);
      if (!Helper.isEmpty(players)) {
        return res.status(200).send({
          status: true,
          message: 'Team players fetched successfully.',
          data: { players: players },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'Team does not have any player',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }
}

export default UserController;
