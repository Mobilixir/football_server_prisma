import { Request, Response } from 'express';

import { eUserType } from '@prisma/client';
import prismaClient from '../utils/database';
import Helper from '../utils/helper';
import validateMatchStat from './validations/matchstat/matchStatValidation';

class MatchStatController {
  public async createMatchStat(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = validateMatchStat(body);

      if (!isValid) {
        return res.status(400).json({ status: false, message: 'error', errors: errors });
      }
      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, [eUserType.ADMIN, eUserType.REFREE]);
      if (response) {
        const matchstat = await prismaClient.matchStat.create({ data: { ...body } });
        return res.status(200).send({
          status: true,
          message: 'Match stat added successfully.',
          data: { matchstat: matchstat },
        });
      } else {
        throw response;
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async updateMatchStat(req: Request, res: Response) {
    try {
      const body = req.body;
      const { errors, isValid } = validateMatchStat(body);

      if (!isValid) {
        return res.status(400).json({ status: false, message: 'error', errors: errors });
      }
      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, [eUserType.ADMIN, eUserType.REFREE]);
      if (response) {
        const matchstat = await prismaClient.matchStat.update({ data: { ...body }, where: { id: body.id } });
        return res.status(200).send({
          status: true,
          message: 'Match stat updated successfully.',
          data: { matchstat: matchstat },
        });
      } else {
        throw response;
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async deleteMatchstat(req: Request, res: Response) {
    try {
      const matchstatId = req.params.matchstatId;

      const user_id = (await Helper.getUserFromToken(req, res)).toString();
      const response = await Helper.checkUserRole(user_id, res, [eUserType.ADMIN, eUserType.REFREE]);
      if (response) {
        const matchstat = await prismaClient.matchStat.delete({ where: { id: matchstatId } });
        return res.status(200).send({
          status: true,
          message: 'Match stat deleted successfully.',
          data: { matchstat: matchstat },
        });
      } else {
        throw response;
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getMatchstatByMatchId(req: Request, res: Response) {
    try {
      const matchId = req.params.matchId;
      const match = await prismaClient.matchStat.findMany({
        where: { matchId: matchId },
        include: { team: true },
      });
      if (!Helper.isEmpty(match)) {
        return res.status(200).send({
          status: true,
          message: 'Match status fetched successfully.',
          data: { match: match },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No Match stat found.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getMatchstatByTeamId(req: Request, res: Response) {
    try {
      const teamId = req.params.teamId;
      const team = await prismaClient.matchStat.findMany({
        where: { teamId: teamId },
        include: { match: true },
      });
      if (!Helper.isEmpty(team)) {
        return res.status(200).send({
          status: true,
          message: 'Team status fetched successfully.',
          data: { team: team },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No Match stat found.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }

  public async getMatchstatByPlayerId(req: Request, res: Response) {
    try {
      const playerId = req.params.playerId;
      const player = await prismaClient.matchStat.findFirst({
        where: { playerId: playerId },
        include: { team: true, match: true },
      });
      if (!Helper.isEmpty(player)) {
        return res.status(200).send({
          status: true,
          message: 'Player status fetched successfully.',
          data: { player: player },
        });
      } else {
        return res.status(200).send({
          status: false,
          message: 'No Match stat found.',
          data: {},
        });
      }
    } catch (error: unknown) {
      return Helper.handleError(error, res);
    }
  }
}

export default MatchStatController;
