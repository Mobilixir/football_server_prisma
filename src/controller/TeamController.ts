import { Request, Response } from 'express';

import validateTeam from './validations/team/teamValidation';
import Helper from '../utils/helper';
import prismaClient from '../utils/database';
import { eUserType } from '@prisma/client';

class TeamController {
  public async createTeam(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = validateTeam(body);

      if (!isValid) {
        return res.status(400).json({ status: false, message: 'error', errors: errors });
      }

      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, eUserType.ADMIN);

      if (response) {
        const team = await prismaClient.team.findFirst({ where: { name: body.name } });

        if (!team) {
          const create_team = await prismaClient.team.create({ data: { ...body } });
          return res.status(200).send({
            status: true,
            message: 'Team created successfully.',
            data: { team: create_team },
          });
        } else {
          return res.status(200).send({
            status: false,
            message: 'Team with same name already exists, please choose another name',
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

  public async updateTeam(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = validateTeam(body);

      if (!isValid) {
        return res.status(400).json({ status: false, message: 'error', errors: errors });
      }

      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, eUserType.ADMIN);

      if (response) {
        const team = await prismaClient.team.findFirst({ where: { id: body.id } });
        if (!Helper.isEmpty(team)) {
          const updated_team = await prismaClient.team.update({ data: { ...body }, where: { id: body.id } });
          return res.status(200).send({
            status: true,
            message: 'Team updated successfully.',
            data: { team: updated_team },
          });
        } else {
          return res.status(200).send({
            status: false,
            message: 'Team does not exists.',
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

  public async getAllTeam(req: Request, res: Response) {
    try {
      const teams = await prismaClient.team.findMany();
      if (teams) {
        return res.status(200).send({
          status: true,
          message: 'All teams fetched successfully.',
          data: { teams: teams },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No teams found',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getTeamById(req: Request, res: Response) {
    try {
      const teamId = req.params.teamId;
      const team = await prismaClient.team.findFirst({ where: { id: teamId } });
      if (team) {
        return res.status(200).send({
          status: true,
          message: 'Team fetched successfully.',
          data: { team: team },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No team found',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async deleteTeamById(req: Request, res: Response) {
    try {
      const teamId = req.params.teamId;
      const team = await prismaClient.team.findFirst({ where: { id: teamId } });
      if (team) {
        await prismaClient.team.delete({ where: { id: teamId } });
        return res.status(200).send({
          status: true,
          message: 'Team deleted successfully.',
          data: {},
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No team found',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }
}
export default TeamController;
