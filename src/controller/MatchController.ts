import { Request, Response } from 'express';

import Helper from '../utils/helper';
import prismaClient from '../utils/database';
import { eUserType } from '@prisma/client';
import validateMatch from './validations/match/matchValidation';

class MatchController {
  public async createMatch(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = validateMatch(body);

      if (!isValid) {
        return res.status(400).json({ status: false, message: 'error', errors: errors });
      }

      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, eUserType.ADMIN);
      if (response) {
        const match = await prismaClient.match.create({ data: { ...body } });
        return res.status(200).send({
          status: true,
          message: 'Match scheduled successfully.',
          data: { match: match },
        });
      } else {
        throw response;
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async updateMatch(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = validateMatch(body);

      if (!isValid) {
        return res.status(400).json({ status: false, message: 'error', errors: errors });
      }

      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, eUserType.ADMIN);
      if (response) {
        const match = await prismaClient.match.update({ data: { ...body }, where: { id: body.id } });
        return res.status(200).send({
          status: true,
          message: 'Match schedule updated successfully.',
          data: { match: match },
        });
      } else {
        throw response;
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async deleteMatch(req: Request, res: Response) {
    try {
      const matchId = req.params.matchId;

      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, eUserType.ADMIN);
      if (response) {
        const match = await prismaClient.match.delete({ where: { id: matchId } });
        return res.status(200).send({
          status: true,
          message: 'Match schedule deleted successfully.',
          data: { match: match },
        });
      } else {
        throw response;
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getAllMatches(req: Request, res: Response) {
    try {
      const matches = await prismaClient.match.findMany({ where: { schedule: { gte: new Date() } } });
      if (matches) {
        return res.status(200).send({
          status: true,
          message: 'Match schedule fetched successfully.',
          data: { matches: matches },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No Match scheduled.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getMatchById(req: Request, res: Response) {
    try {
      const matchId = req.params.matchId;
      const match = await prismaClient.match.findFirst({ where: { id: matchId } });
      if (!Helper.isEmpty(match)) {
        return res.status(200).send({
          status: true,
          message: 'Match schedule fetched successfully.',
          data: { match: match },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No Match scheduled.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getMatchesByTeamId(req: Request, res: Response) {
    try {
      const teamId = req.params.teamId;
      const matches = await prismaClient.match.findMany({
        where: { OR: [{ team1Id: teamId }, { team2Id: teamId }], AND: { schedule: { gte: new Date() } } },
      });
      if (matches) {
        return res.status(200).send({
          status: true,
          message: 'Match schedule fetched successfully.',
          data: { matches: matches },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No Match scheduled.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getMatchesHistoryByTeamId(req: Request, res: Response) {
    try {
      const teamId = req.params.teamId;
      const matches = await prismaClient.match.findMany({
        where: { OR: [{ team1Id: teamId }, { team2Id: teamId }], AND: { schedule: { lte: new Date() } } },
      });
      if (matches) {
        return res.status(200).send({
          status: true,
          message: 'Match schedule fetched successfully.',
          data: { matches: matches },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No Match found.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }
}

export default MatchController;
